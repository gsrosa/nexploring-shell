'use client';

import React from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { useAuthUiStore } from '@/features/auth/auth-ui-store';
import { useSession } from '@/features/auth/use-session';
import { useCreditsStore } from '@/features/credits/credits-store';

import { useTrpc } from '@/trpc/client';

/** Listens for `nexploring:request-login` and eagerly warms the session cache. */
export const AuthShellEffects = () => {
  const trpc = useTrpc();
  const queryClient = useQueryClient();
  const { profile } = useSession();

  React.useEffect(() => {
    void queryClient.prefetchQuery(
      trpc.users.me.queryOptions(undefined, { retry: false }),
    );
  }, [queryClient, trpc]);

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
    window.addEventListener('nexploring:request-login', handleRequestLogin);
    return () =>
      window.removeEventListener('nexploring:request-login', handleRequestLogin);
  }, []);

  React.useEffect(() => {
    const handleTravelerProfileUpdated = () => {
      void queryClient.invalidateQueries(trpc.travelerProfile.get.queryFilter());
    };
    window.addEventListener(
      'nexploring:traveler-profile-updated',
      handleTravelerProfileUpdated,
    );
    return () =>
      window.removeEventListener(
        'nexploring:traveler-profile-updated',
        handleTravelerProfileUpdated,
      );
  }, [queryClient, trpc]);

  // Credits events dispatched by MFEs
  React.useEffect(() => {
    const handleCreditsUpdated = () =>
      void queryClient.invalidateQueries(trpc.users.me.queryFilter());
    const handleOpenPurchaseModal = () =>
      useCreditsStore.getState().openPurchaseModal();

    window.addEventListener('nexploring:credits-updated', handleCreditsUpdated);
    window.addEventListener('nexploring:open-purchase-modal', handleOpenPurchaseModal);
    return () => {
      window.removeEventListener('nexploring:credits-updated', handleCreditsUpdated);
      window.removeEventListener('nexploring:open-purchase-modal', handleOpenPurchaseModal);
    };
  }, [queryClient, trpc]);

  return null;
};
