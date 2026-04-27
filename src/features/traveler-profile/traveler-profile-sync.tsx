'use client';

import React from 'react';

import { useQuery } from '@tanstack/react-query';

import { useSession } from '@/features/auth/use-session';

import { useTrpc } from '@/trpc/client';

import { useTravelerProfileUiStore } from './traveler-profile-store';

/** Keeps shell Zustand in sync with `travelerProfile.get` for nav awareness. */
export const TravelerProfileSync = React.memo(() => {
  const { isAuthenticated, isLoading } = useSession();
  const setSnapshot = useTravelerProfileUiStore((s) => s.setSnapshot);
  const trpc = useTrpc();

  const query = useQuery(
    trpc.travelerProfile.get.queryOptions(undefined, {
      enabled: Boolean(isAuthenticated && !isLoading),
      staleTime: 30_000,
      retry: 1,
    }),
  );

  React.useEffect(() => {
    if (!isAuthenticated || isLoading) {
      setSnapshot(null);
      return;
    }
    if (query.data) {
      setSnapshot({ tier1Complete: query.data.tier1Complete });
    }
  }, [isAuthenticated, isLoading, query.data, setSnapshot]);

  return null;
});
