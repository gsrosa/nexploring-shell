import { useQuery } from '@tanstack/react-query';
import { isTRPCClientError } from '@trpc/client';

import { useTrpc } from '@/trpc/client';

export const useSession = () => {
  const trpc = useTrpc();
  const me = useQuery(
    trpc.users.me.queryOptions(undefined, {
      retry: false,
      staleTime: 5 * 60 * 1000, // session doesn't change often; skip background refetches
      refetchOnWindowFocus: true, // still re-validate when tab regains focus
    }),
  );

  const isAuthenticated = me.isSuccess;
  const isLoading = me.isPending;
  const isUnauthorized =
    me.isError &&
    isTRPCClientError(me.error) &&
    me.error.data?.code === 'UNAUTHORIZED';

  return {
    /** Row from `users.me` (includes `email`, `display_name`, etc.) */
    profile: me.data?.profile ?? null,
    isAuthenticated,
    /** True while the first session check is in flight */
    isLoading,
    isUnauthorized,
    refetch: me.refetch,
  };
}
