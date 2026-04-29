'use client';

import React from 'react';

import { AuthRemoteGate } from '@/features/auth/auth-remote-gate';

import { loadRemoteModule } from '@/microfrontends/load-remote-module';
import { RemoteErrorBoundary } from '@/microfrontends/remote-error-boundary';
import { UserAppRemoteSuspenseFallback } from '@/microfrontends/user-app-remote-suspense-fallback';

const TripDetails = loadRemoteModule('planning', 'TripDetailPage');
const TripDetailsSkeleton = loadRemoteModule('planning', 'TripDetailSkeleton');

const SkeletonFallback = () => (
  <React.Suspense fallback={<UserAppRemoteSuspenseFallback />}>
    <TripDetailsSkeleton />
  </React.Suspense>
);

export default function MyTripsSection() {
  return (
    <RemoteErrorBoundary remoteName="My Trips">
      <AuthRemoteGate
        remoteLabel="My Trips"
        loadingFallback={<SkeletonFallback />}
      >
        <React.Suspense fallback={<SkeletonFallback />}>
          <TripDetails />
        </React.Suspense>
      </AuthRemoteGate>
    </RemoteErrorBoundary>
  );
}
