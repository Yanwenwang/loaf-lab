// @vitest-environment node

import { describe, expect, it, vi } from 'vitest';
import { rateLimit } from '../rateLimit.js';

describe('rateLimit middleware', () => {
  it('calls next for requests under the limit', () => {
    const req = { ip: `test-under-${Date.now()}` } as any;
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
      setHeader: vi.fn(),
    } as any;
    const next = vi.fn();

    rateLimit(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(res.status).not.toHaveBeenCalled();
  });

  it('returns 429 when requests exceed the limit', () => {
    const req = { ip: `test-over-${Date.now()}` } as any;
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
      setHeader: vi.fn(),
    } as any;
    const next = vi.fn();

    for (let i = 0; i < 31; i += 1) {
      rateLimit(req, res, next);
    }

    expect(res.status).toHaveBeenCalledWith(429);
    expect(res.json).toHaveBeenCalledWith({ error: 'Too many requests. Please try again shortly.' });
    expect(res.setHeader).toHaveBeenCalledWith('Retry-After', expect.any(String));
  });
});
