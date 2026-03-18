// @vitest-environment node

import { beforeEach, describe, expect, it, vi } from 'vitest';

const ORIGINAL_ENV = process.env;

beforeEach(() => {
  vi.resetModules();
  process.env = { ...ORIGINAL_ENV };
});

describe('env config', () => {
  it('parses valid PORT and falls back model default', async () => {
    process.env.PORT = '4000';
    process.env.OPENAI_API_KEY = 'test-key';
    delete process.env.OPENAI_MODEL;

    const { env, assertEnv } = await import('../env.js');

    expect(env.port).toBe(4000);
    expect(env.openAiModel).toBe('gpt-4o-mini');
    expect(() => assertEnv()).not.toThrow();
  });

  it('throws for invalid PORT', async () => {
    process.env.PORT = '0';
    process.env.OPENAI_API_KEY = 'test-key';

    await expect(import('../env.js')).rejects.toThrow('Invalid PORT value');
  });

  it('throws when OPENAI_API_KEY is missing at startup assertion', async () => {
    delete process.env.OPENAI_API_KEY;

    const { assertEnv } = await import('../env.js');

    expect(() => assertEnv()).toThrow('Missing required env var: OPENAI_API_KEY');
  });
});
