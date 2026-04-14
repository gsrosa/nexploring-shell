import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { createTRPCReact } from '@trpc/react-query';
import type { ReactNode } from 'react';
import { useState } from 'react';
import superjson from 'superjson';
import type { AppRouter } from 'atlas-bff/trpc';

export const trpc = createTRPCReact<AppRouter>();

const defaultApi = 'http://127.0.0.1:4000';

function trpcUrl(): string {
  const base = (import.meta.env.VITE_API_URL ?? defaultApi).replace(/\/$/, '');
  return `${base}/trpc`;
}

// Module-level singleton — survives React StrictMode double-mounts, HMR, and
// error-boundary retries. Prevents auth/session cache from being wiped and
// forcing "Checking your session…" on every protected-route visit.
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,   // 1 min — skip refetch on quick re-navigations
      gcTime: 10 * 60 * 1000, // 10 min — keep unused entries alive
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

interface Props {
  children: ReactNode;
}

export function QueryProvider({ children }: Props) {
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: trpcUrl(),
          transformer: superjson,
          fetch(input, init) {
            return fetch(input, {
              ...init,
              credentials: 'include',
            });
          },
        }),
      ],
    }),
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
}
