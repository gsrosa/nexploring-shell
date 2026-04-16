import path from 'node:path';
import { defineConfig, loadEnv } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import federation from '@originjs/vite-plugin-federation';
import { buildRemotes } from './module-federation/remotes';
import { shared } from './module-federation/shared';

export default defineConfig(({ mode }) => {
  const envVars = loadEnv(mode, process.cwd(), 'VITE_');

  return {
    plugins: [
      tailwindcss(),
      react(),
      federation({
        name: 'shell',
        remotes: buildRemotes(envVars),
        shared,
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    server: {
      port: 3000,
      strictPort: true,
      headers: {
        'Cache-Control': 'no-store',
      },
    },
    preview: {
      port: 3000,
      strictPort: true,
      headers: {
        'Cache-Control': 'no-store',
      },
    },
    optimizeDeps: {
      exclude: ['@gsrosa/atlas-ui'],
    },
    build: {
      target: 'esnext',
      minify: false,
    },
  };
});
