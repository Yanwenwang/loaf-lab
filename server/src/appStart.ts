import { env, assertEnv } from './config/env.js';
import { createApp } from './app.js';
import { createChatService } from './services/chatService.js';

export const appStart = () => {
  assertEnv();

  const chatService = createChatService({
    apiKey: env.openAiApiKey,
    model: env.openAiModel,
  });

  const app = createApp({ chatService, trustProxy: env.trustProxy });

  const server = app.listen(env.port, () => {
    // eslint-disable-next-line no-console
    console.log(`API server listening on http://localhost:${env.port}`);
  });

  const shutdown = (signal: 'SIGINT' | 'SIGTERM') => {
    // eslint-disable-next-line no-console
    console.log(`Received ${signal}. Shutting down gracefully...`);

    const forceTimeout = setTimeout(() => {
      // eslint-disable-next-line no-console
      console.error('Force exiting after shutdown timeout');
      process.exit(1);
    }, 10_000);

    server.close((error) => {
      clearTimeout(forceTimeout);

      if (error) {
        // eslint-disable-next-line no-console
        console.error('Shutdown error:', error);
        process.exit(1);
        return;
      }

      process.exit(0);
    });
  };

  process.once('SIGINT', () => shutdown('SIGINT'));
  process.once('SIGTERM', () => shutdown('SIGTERM'));
};
