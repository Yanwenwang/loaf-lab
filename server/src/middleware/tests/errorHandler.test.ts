// @vitest-environment node

import { beforeEach, describe, expect, it, vi } from 'vitest';

const ORIGINAL_ENV = process.env;

beforeEach(() => {
  vi.resetModules();
  process.env = { ...ORIGINAL_ENV };
});

describe('errorHandler middleware', () => {
  it('returns generic message for 5xx in production', async () => {
    process.env.NODE_ENV = 'production';

    const { errorHandler } = await import('../errorHandler.js');

    const res = {
      statusCode: 0,
      body: null as null | { error: string },
      status(code: number) {
        this.statusCode = code;
        return this;
      },
      json(payload: { error: string }) {
        this.body = payload;
        return this;
      },
    };

    errorHandler(new Error('provider timeout'), {} as never, res as never, (() => {}) as never);

    expect(res.statusCode).toBe(500);
    expect(res.body).toEqual({ error: 'Internal Server Error' });
  });

  it('returns detailed message for non-production', async () => {
    process.env.NODE_ENV = 'test';

    const { errorHandler } = await import('../errorHandler.js');

    const err = Object.assign(new Error('Bad request data'), { statusCode: 400 });
    const res = {
      statusCode: 0,
      body: null as null | { error: string },
      status(code: number) {
        this.statusCode = code;
        return this;
      },
      json(payload: { error: string }) {
        this.body = payload;
        return this;
      },
    };

    errorHandler(err, {} as never, res as never, (() => {}) as never);

    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({ error: 'Bad request data' });
  });
});
