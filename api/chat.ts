import Joi from 'joi';
import OpenAI from 'openai';
import { SYSTEM_PROMPT } from '../server/src/config/prompts.js';

type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

const MAX_TEXT_LENGTH = 4000;
const MAX_HISTORY_MESSAGES = 12;

const chatRequestSchema = Joi.object({
  message: Joi.string().trim().min(1).max(MAX_TEXT_LENGTH).required(),
  history: Joi.array()
    .items(
      Joi.object({
        role: Joi.string().valid('user', 'assistant').required(),
        content: Joi.string().trim().min(1).max(MAX_TEXT_LENGTH).required(),
      }),
    )
    .max(MAX_HISTORY_MESSAGES)
    .default([]),
});

const normalizeHistory = (history: unknown): ChatMessage[] => {
  if (!Array.isArray(history)) {
    return [];
  }

  return history
    .filter(
      (item): item is ChatMessage =>
        !!item &&
        (item as ChatMessage).role !== undefined &&
        ((item as ChatMessage).role === 'user' || (item as ChatMessage).role === 'assistant') &&
        typeof (item as ChatMessage).content === 'string' &&
        (item as ChatMessage).content.trim().length > 0,
    )
    .slice(-MAX_HISTORY_MESSAGES);
};

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  const apiKey = process.env.OPENAI_API_KEY || '';
  const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';

  if (!apiKey) {
    res.status(500).json({ error: 'Server misconfigured: missing OPENAI_API_KEY' });
    return;
  }

  const { value, error } = chatRequestSchema.validate(req.body, { stripUnknown: true });

  if (error) {
    res.status(400).json({ error: error.message });
    return;
  }

  const openai = new OpenAI({ apiKey });

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache, no-transform');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('X-Accel-Buffering', 'no');

  const messages = [
    { role: 'system' as const, content: SYSTEM_PROMPT },
    ...normalizeHistory(value.history),
    { role: 'user' as const, content: value.message.trim() },
  ];

  let fullText = '';

  try {
    res.write('event: start\n');
    res.write('data: {}\n\n');

    const stream = await openai.chat.completions.create({
      model,
      messages,
      stream: true,
    });

    for await (const chunk of stream) {
      const token = chunk.choices?.[0]?.delta?.content;

      if (!token) {
        continue;
      }

      fullText += token;
      res.write('event: token\n');
      res.write(`data: ${JSON.stringify({ token })}\n\n`);
    }

    res.write('event: done\n');
    res.write(`data: ${JSON.stringify({ text: fullText })}\n\n`);
    res.end();
  } catch (streamError) {
    const rawMessage = streamError instanceof Error ? streamError.message : 'OpenAI streaming error';
    const safeMessage = process.env.NODE_ENV === 'production' ? 'Streaming failed' : rawMessage;

    res.write('event: error\n');
    res.write(`data: ${JSON.stringify({ error: safeMessage })}\n\n`);
    res.end();
  }
}
