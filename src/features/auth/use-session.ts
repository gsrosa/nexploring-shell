import { isTRPCClientError } from '@trpc/client';

import { trpc } from '@/lib/trpc';

export const useSession = () => {
  const me = trpc.users.me.useQuery(undefined, {
    retry: false,
    staleTime: 5 * 60 * 1000,  // session doesn't change often; skip background refetches
    refetchOnWindowFocus: true, // still re-validate when tab regains focus
  });

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
