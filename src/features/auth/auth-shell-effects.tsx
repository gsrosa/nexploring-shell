import { useEffect } from 'react';

import { useAuthUiStore } from '@/features/auth/auth-ui-store';
import { trpc } from '@/shared/providers/query-provider';

/** Listens for `atlas:request-login` and eagerly warms the session cache. */
export function AuthShellEffects() {
  const utils = trpc.useUtils();

  // Prefetch session on mount so auth-gated MFEs never show "Checking your
  // session…" on first navigation — the cache will already be populated.
  useEffect(() => {
    void utils.users.me.prefetch(undefined, { retry: false });
  }, [utils]);

  useEffect(() => {
    const onRequest = () => {
      useAuthUiStore.getState().openLogin();
    };
    window.addEventListener('atlas:request-login', onRequest);
    return () => window.removeEventListener('atlas:request-login', onRequest);
  }, []);

  return null;
}
