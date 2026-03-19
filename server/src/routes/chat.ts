import Joi from 'joi';
import { Router } from 'express';
import { env } from '../config/env.js';
import type { LLMService } from '../types/llm.js';

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

export const createChatRouter = ({ chatService }: { chatService: LLMService }) => {
  const router = Router();

  router.post('/chat', async (req, res) => {
    const { value, error } = chatRequestSchema.validate(req.body, {
      stripUnknown: true,
    });

    if (error) {
      res.status(400).json({ error: error.message });
      return;
    }

    const timeoutController = new AbortController();
    const timeout = setTimeout(() => timeoutController.abort(), 60000);

    let isClosed = false;

    res.on('close', () => {
      isClosed = true;
      timeoutController.abort();
      clearTimeout(timeout);
    });

    const safeWrite = (chunk: string) => {
      if (isClosed || res.writableEnded || timeoutController.signal.aborted) {
        return;
      }

      res.write(chunk);
    };

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache, no-transform');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('X-Accel-Buffering', 'no');
    res.flushHeaders();

    let fullText = '';

    try {
      safeWrite('event: start\n');
      safeWrite('data: {}\n\n');

      await chatService.streamChat({
        message: value.message,
        history: value.history,
        signal: timeoutController.signal,
        onToken: (token) => {
          fullText += token;
          safeWrite('event: token\n');
          safeWrite(`data: ${JSON.stringify({ token })}\n\n`);
        },
      });

      safeWrite('event: done\n');
      safeWrite(`data: ${JSON.stringify({ text: fullText })}\n\n`);

      if (!res.writableEnded) {
        res.end();
      }
    } catch (streamError) {
      if (!isClosed && !timeoutController.signal.aborted) {
        const rawMessage = streamError instanceof Error ? streamError.message : 'OpenAI streaming error';
        const safeMessage = env.nodeEnv === 'production' ? 'Streaming failed' : rawMessage;

        safeWrite('event: error\n');
        safeWrite(`data: ${JSON.stringify({ error: safeMessage })}\n\n`);
      }

      if (!res.writableEnded) {
        res.end();
      }
    } finally {
      clearTimeout(timeout);
    }
  });

  return router;
};
