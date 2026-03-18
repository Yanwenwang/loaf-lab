import type { RequestHandler } from 'express';

type Bucket = {
  count: number
  resetAt: number
};

const buckets = new Map<string, Bucket>();

const WINDOW_MS = 60 * 1000;
const MAX_REQUESTS = 30;
const PRUNE_INTERVAL_MS = 5 * 60 * 1000;

let lastPruneAt = 0;

const pruneExpiredBuckets = (now: number) => {
  if (now - lastPruneAt < PRUNE_INTERVAL_MS) {
    return;
  }

  for (const [key, bucket] of buckets.entries()) {
    if (now > bucket.resetAt) {
      buckets.delete(key);
    }
  }

  lastPruneAt = now;
};

export const rateLimit: RequestHandler = (req, res, next) => {
  const key = req.ip || req.socket.remoteAddress || 'unknown';
  const now = Date.now();

  pruneExpiredBuckets(now);

  const current = buckets.get(key);

  if (!current || now > current.resetAt) {
    const resetAt = now + WINDOW_MS;
    buckets.set(key, { count: 1, resetAt });
    res.setHeader('X-RateLimit-Limit', String(MAX_REQUESTS));
    res.setHeader('X-RateLimit-Remaining', String(MAX_REQUESTS - 1));
    res.setHeader('X-RateLimit-Reset', String(Math.ceil(resetAt / 1000)));
    next();
    return;
  }

  current.count += 1;

  const remaining = Math.max(MAX_REQUESTS - current.count, 0);
  res.setHeader('X-RateLimit-Limit', String(MAX_REQUESTS));
  res.setHeader('X-RateLimit-Remaining', String(remaining));
  res.setHeader('X-RateLimit-Reset', String(Math.ceil(current.resetAt / 1000)));

  if (current.count > MAX_REQUESTS) {
    const retryAfterSeconds = Math.max(Math.ceil((current.resetAt - now) / 1000), 1);
    res.setHeader('Retry-After', String(retryAfterSeconds));
    res.status(429).json({ error: 'Too many requests. Please try again shortly.' });
    return;
  }

  next();
};
