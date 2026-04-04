import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { imagetools } from 'vite-imagetools';
import type { Plugin } from 'vite';

const imagetoolsTestStub: Plugin = {
  name: 'imagetools-test-stub',
  enforce: 'pre',
  resolveId(id) {
    if (/\.(jpe?g|png|webp|gif)\?/.test(id)) {
      return '\0imagetools-stub:' + id;
    }
  },
  load(id) {
    if (id.startsWith('\0imagetools-stub:')) {
      return 'export default ""';
    }
  },
};

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [mode === 'test' ? imagetoolsTestStub : imagetools(), react(), tailwindcss()],
  server: {
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
  },
}));
