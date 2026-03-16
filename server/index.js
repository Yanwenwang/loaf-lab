import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import OpenAI from 'openai';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';

if (!process.env.OPENAI_API_KEY) {
  // eslint-disable-next-line no-console
  console.warn('Missing OPENAI_API_KEY. Set it in .env before calling /api/chat.');
}

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const SYSTEM_PROMPT =
  'You are Loaf Lab Advisor. Give practical, concise sourdough guidance with concrete next-bake adjustments.';

app.use(cors());
app.use(express.json({ limit: '1mb' }));

app.post('/api/chat', async (req, res) => {
  const { message, history = [] } = req.body ?? {};

  if (typeof message !== 'string' || message.trim().length === 0) {
    return res.status(400).json({ error: 'message is required' });
  }

  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ error: 'OPENAI_API_KEY is not configured' });
  }

  const normalizedHistory = Array.isArray(history)
    ? history
        .filter(
          (item) =>
            item &&
            (item.role === 'user' || item.role === 'assistant') &&
            typeof item.content === 'string' &&
            item.content.trim().length > 0,
        )
        .slice(-12)
    : [];

  const messages = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...normalizedHistory,
    { role: 'user', content: message.trim() },
  ];

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 60000);

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache, no-transform');
  res.setHeader('Connection', 'keep-alive');

  let fullText = '';

  try {
    const stream = await openai.chat.completions.create(
      {
        model,
        messages,
        stream: true,
      },
      { signal: controller.signal },
    );

    res.write('event: start\n');
    res.write(`data: ${JSON.stringify({ model })}\n\n`);

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
  } catch (error) {
    const messageText = error instanceof Error ? error.message : 'Unknown OpenAI error';

    res.write('event: error\n');
    res.write(`data: ${JSON.stringify({ error: messageText })}\n\n`);
    res.end();
  } finally {
    clearTimeout(timeout);
  }

  return undefined;
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`API server listening on http://localhost:${port}`);
});
