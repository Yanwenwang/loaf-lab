const parsePort = (rawPort: string | undefined, fallback = 3001): number => {
  if (!rawPort || rawPort.trim().length === 0) {
    return fallback;
  }

  const port = Number(rawPort);

  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error(`Invalid PORT value: ${rawPort}. Expected an integer between 1 and 65535.`);
  }

  return port;
};

export const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  trustProxy: process.env.TRUST_PROXY === 'true',
  port: parsePort(process.env.PORT),
  openAiApiKey: process.env.OPENAI_API_KEY || '',
  openAiModel: process.env.OPENAI_MODEL || 'gpt-4o-mini',
};

export const assertEnv = () => {
  if (!env.openAiApiKey || env.openAiApiKey.trim().length === 0) {
    throw new Error('Missing required env var: OPENAI_API_KEY');
  }
};
