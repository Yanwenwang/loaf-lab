// @vitest-environment node

import { beforeEach, describe, expect, it, vi } from 'vitest';
import { SYSTEM_PROMPT } from '../../config/prompts.js';

const createMock = vi.fn();

vi.mock('openai', () => {
  class OpenAI {
    chat = {
      completions: {
        create: createMock,
      },
    };
  }

  return { default: OpenAI };
});

const streamFromTokens = async function* (tokens: Array<string | undefined>) {
  for (const token of tokens) {
    yield { choices: [{ delta: { content: token } }] };
  }
};

describe('chatService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('streams tokens and builds messages with system prompt + trimmed user message', async () => {
    createMock.mockResolvedValue(streamFromTokens(['hel', 'lo']));

    const { createChatService } = await import('../chatService.js');
    const service = createChatService({ apiKey: 'test-key', model: 'test-model' });

    const received: string[] = [];

    await service.streamChat({
      message: '  hi there  ',
      history: [],
      signal: new AbortController().signal,
      onToken: (token) => received.push(token),
    });

    expect(received).toEqual(['hel', 'lo']);
    expect(createMock).toHaveBeenCalledTimes(1);

    const [payload, options] = createMock.mock.calls[0];

    expect(payload.model).toBe('test-model');
    expect(payload.stream).toBe(true);
    expect(payload.messages).toEqual([
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: 'hi there' },
    ]);
    expect(options).toHaveProperty('signal');
  });

  it('normalizes history (filters invalid and keeps latest 12)', async () => {
    createMock.mockResolvedValue(streamFromTokens([undefined, 'ok']));

    const { createChatService } = await import('../chatService.js');
    const service = createChatService({ apiKey: 'test-key', model: 'test-model' });

    const history = [
      { role: 'user', content: 'keep-1' },
      { role: 'assistant', content: 'keep-2' },
      { role: 'system', content: 'drop-role' },
      { role: 'user', content: '   ' },
      null,
      ...Array.from({ length: 13 }).map((_, index) => ({
        role: index % 2 === 0 ? 'user' : 'assistant',
        content: `msg-${index + 1}`,
      })),
    ] as Array<{ role: 'user' | 'assistant'; content: string }>;

    await service.streamChat({
      message: 'question',
      history,
      signal: new AbortController().signal,
      onToken: vi.fn(),
    });

    const [payload] = createMock.mock.calls[0];
    const sentMessages = payload.messages as Array<{ role: string; content: string }>;

    expect(sentMessages).toHaveLength(14);
    expect(sentMessages[0]).toEqual({ role: 'system', content: SYSTEM_PROMPT });
    expect(sentMessages.at(-1)).toEqual({ role: 'user', content: 'question' });

    const historyMessages = sentMessages.slice(1, -1);
    expect(historyMessages[0].content).toBe('msg-2');
    expect(historyMessages.at(-1)?.content).toBe('msg-13');
  });
});
