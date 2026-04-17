import path from 'node:path';
import { fileURLToPath } from 'node:url';

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vitest/config';

const root = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [tailwindcss(), react()],
  resolve: {
    alias: {
      '@': path.resolve(root, 'src'),
    },
  },
  optimizeDeps: {
    exclude: ['@gsrosa/atlas-ui'],
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    globals: false,
    include: ['src/**/*.{unit,integration}.test.{ts,tsx}'],
    css: true,
    passWithNoTests: false,
  },
});
