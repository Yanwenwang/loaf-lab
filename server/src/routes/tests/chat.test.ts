// @vitest-environment node

import express from 'express';
import request from 'supertest';
import { describe, expect, it, vi } from 'vitest';
import { createChatRouter } from '../chat.js';

describe('chat route', () => {
  it('returns 400 when message is missing', async () => {
    const chatService = {
      streamChat: vi.fn(),
    };

    const app = express();
    app.use(express.json());
    app.use('/api', createChatRouter({ chatService }));

    const response = await request(app).post('/api/chat').send({ history: [] });

    expect(response.status).toBe(400);
    expect(response.body.error).toContain('"message"');
    expect(chatService.streamChat).not.toHaveBeenCalled();
  });

  it('returns 400 when message exceeds max length', async () => {
    const chatService = {
      streamChat: vi.fn(),
    };

    const app = express();
    app.use(express.json());
    app.use('/api', createChatRouter({ chatService }));

    const response = await request(app)
      .post('/api/chat')
      .send({ message: 'x'.repeat(4001), history: [] });

    expect(response.status).toBe(400);
    expect(response.body.error).toContain('length must be less than or equal to 4000');
    expect(chatService.streamChat).not.toHaveBeenCalled();
  });

  it('streams token and done events for valid request', async () => {
    const chatService = {
      streamChat: vi.fn(async ({ onToken }) => {
        onToken('hello');
      }),
    };

    const app = express();
    app.use(express.json());
    app.use('/api', createChatRouter({ chatService }));

    const response = await request(app).post('/api/chat').send({ message: 'test', history: [] });

    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toContain('text/event-stream');
    expect(response.text).toContain('event: start');
    expect(response.text).toContain('event: token');
    expect(response.text).toContain('"token":"hello"');
    expect(response.text).toContain('event: done');
    expect(chatService.streamChat).toHaveBeenCalledTimes(1);
  });

  it('streams error event when chat service throws', async () => {
    const chatService = {
      streamChat: vi.fn(async () => {
        throw new Error('provider timeout');
      }),
    };

    const app = express();
    app.use(express.json());
    app.use('/api', createChatRouter({ chatService }));

    const response = await request(app).post('/api/chat').send({ message: 'test', history: [] });

    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toContain('text/event-stream');
    expect(response.text).toContain('event: error');
    expect(response.text).toContain('provider timeout');
    expect(chatService.streamChat).toHaveBeenCalledTimes(1);
  });
});
