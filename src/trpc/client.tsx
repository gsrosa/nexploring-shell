import { createTRPCContext } from '@trpc/tanstack-react-query';

import type { AppRouter } from './types';

const trpcContext = createTRPCContext<AppRouter>();

export const TRPCProvider = trpcContext.TRPCProvider;
export const useTRPC = trpcContext.useTRPC;
export const useTRPCClient = trpcContext.useTRPCClient;
export const useTrpc = trpcContext.useTRPC;
