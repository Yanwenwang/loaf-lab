// @vitest-environment node

import request from 'supertest';
import { describe, expect, it, vi } from 'vitest';
import { createApp } from '../app.js';

describe('app smoke test', () => {
  it('serves /health', async () => {
    const chatService = {
      streamChat: vi.fn(),
    };

    const app = createApp({ chatService });
    const healthResponse = await request(app).get('/health');

    expect(healthResponse.status).toBe(200);
    expect(healthResponse.body).toEqual({ ok: true });
  });

  it('mounts /api/chat and streams response events', async () => {
    const chatService = {
      streamChat: vi.fn(async ({ onToken }) => {
        onToken('ok');
      }),
    };

    const app = createApp({ chatService });
    const chatResponse = await request(app)
      .post('/api/chat')
      .send({ message: 'test', history: [] });

    expect(chatResponse.status).toBe(200);
    expect(chatResponse.headers['content-type']).toContain('text/event-stream');
    expect(chatResponse.text).toContain('event: start');
    expect(chatResponse.text).toContain('event: token');
    expect(chatResponse.text).toContain('event: done');
    expect(chatService.streamChat).toHaveBeenCalledTimes(1);
  });
});
