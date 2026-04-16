import React from 'react';

import { useAuthUiStore } from '@/features/auth/auth-ui-store';
import { trpc } from '@/lib/trpc';

/** Listens for `atlas:request-login` and eagerly warms the session cache. */
export const AuthShellEffects = () => {
  const utils = trpc.useUtils();

  React.useEffect(() => {
    void utils.users.me.prefetch(undefined, { retry: false });
  }, [utils]);

  React.useEffect(() => {
    const handleRequestLogin = () => {
      useAuthUiStore.getState().openLogin();
    };
    window.addEventListener('atlas:request-login', handleRequestLogin);
    return () =>
      window.removeEventListener('atlas:request-login', handleRequestLogin);
  }, []);

  React.useEffect(() => {
    const handleTravelerProfileUpdated = () => {
      void utils.travelerProfile.get.invalidate();
    };
    window.addEventListener(
      'atlas:traveler-profile-updated',
      handleTravelerProfileUpdated,
    );
    return () =>
      window.removeEventListener(
        'atlas:traveler-profile-updated',
        handleTravelerProfileUpdated,
      );
  }, [utils]);

  return null;
};
