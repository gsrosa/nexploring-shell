'use client';

import React from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createTRPCClient, httpBatchLink } from '@trpc/client';
import type { ReactNode } from 'react';
import superjson from 'superjson';

import { TRPCProvider } from '@/trpc/client';
import type { AppRouter } from '@/trpc/types';

const defaultApi = 'http://127.0.0.1:4000';

const trpcUrl = (): string => {
  const base = (process.env.NEXT_PUBLIC_API_URL ?? defaultApi).replace(/\/$/, '');
  return `${base}/trpc`;
};

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });
}
 
let browserQueryClient: QueryClient | undefined = undefined;
 
function getQueryClient() {
  if (typeof window === 'undefined') {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

type Props = {
  children: ReactNode;
};

export const QueryProvider = ({ children }: Props) => {
  const queryClient = getQueryClient();
  const [trpcClient] = React.useState(() =>
    createTRPCClient<AppRouter>({
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
    <QueryClientProvider client={queryClient}>
      <TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
        {children}
      </TRPCProvider>
    </QueryClientProvider>
  );
};
