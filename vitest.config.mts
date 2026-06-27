import { defineConfig } from 'vitest/config';
import path from 'path';
import pkg from '@next/env';
const { loadEnvConfig } = pkg;

// Load Next.js environment variables (including .env and .env.local)
loadEnvConfig(process.cwd());

export default defineConfig({
  test: {
    alias: {
      '@': path.resolve(__dirname, './src')
    },
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/.next/**',
      '**/tests/e2e/**',
      '**/.agents/**',
    ]
  }
});

