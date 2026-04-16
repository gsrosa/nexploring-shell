import React from 'react';

import { useAuthUiStore } from '@/features/auth/auth-ui-store';
import { useSession } from '@/features/auth/use-session';
import { useCreditsStore } from '@/features/credits/credits-store';
import { trpc } from '@/lib/trpc';

/** Listens for `atlas:request-login` and eagerly warms the session cache. */
export const AuthShellEffects = () => {
  const utils = trpc.useUtils();
  const { profile } = useSession();

  React.useEffect(() => {
    void utils.users.me.prefetch(undefined, { retry: false });
  }, [utils]);

  // Sync credits balance from session into the credits store
  React.useEffect(() => {
    if (profile?.credits_balance != null) {
      useCreditsStore.getState().setBalance(profile.credits_balance);
    }
  }, [profile?.credits_balance]);

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

  // Credits events dispatched by MFEs
  React.useEffect(() => {
    const handleCreditsUpdated = () => void utils.users.me.invalidate();
    const handleOpenPurchaseModal = () =>
      useCreditsStore.getState().openPurchaseModal();

    window.addEventListener('atlas:credits-updated', handleCreditsUpdated);
    window.addEventListener('atlas:open-purchase-modal', handleOpenPurchaseModal);
    return () => {
      window.removeEventListener('atlas:credits-updated', handleCreditsUpdated);
      window.removeEventListener('atlas:open-purchase-modal', handleOpenPurchaseModal);
    };
  }, [utils]);

  return null;
};
