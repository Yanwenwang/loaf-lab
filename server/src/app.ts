import cors from 'cors';
import express from 'express';
import { createChatRouter } from './routes/chat.js';
import { errorHandler } from './middleware/errorHandler.js';
import { rateLimit } from './middleware/rateLimit.js';
import type { LLMService } from './types/llm.js';

type CreateAppInput = {
  chatService: LLMService
  trustProxy?: boolean
};

export const createApp = ({ chatService, trustProxy = false }: CreateAppInput) => {
  const app = express();

  if (trustProxy) {
    app.set('trust proxy', true);
  }

  app.use(cors());
  app.use(express.json({ limit: '1mb' }));
  app.use(rateLimit);

  app.use('/api', createChatRouter({ chatService }));

  app.get('/health', (_req, res) => {
    res.json({ ok: true });
  });

  app.use(errorHandler);

  return app;
};
