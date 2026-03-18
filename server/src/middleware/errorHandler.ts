import type { ErrorRequestHandler } from 'express';
import { env } from '../config/env.js';

type ApiError = Error & {
  statusCode?: number
};

export const errorHandler: ErrorRequestHandler = (error: ApiError, _req, res, _next) => {
  const status = error.statusCode || 500;
  const rawMessage = error.message || 'Internal Server Error';
  const isServerError = status >= 500;

  const message = env.nodeEnv === 'production' && isServerError
    ? 'Internal Server Error'
    : rawMessage;

  res.status(status).json({ error: message });
};
