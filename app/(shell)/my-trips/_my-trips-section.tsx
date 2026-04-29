'use client';

import React from 'react';

import { AuthRemoteGate } from '@/features/auth/auth-remote-gate';

import { RemoteErrorBoundary } from '@/components/remote-error-boundary';
import { UserAppRemoteSuspenseFallback } from '@/components/user-app-remote-suspense-fallback';
import { loadRemoteModule } from '@/microfrontends/load-remote-module';

const MyTripsApp = loadRemoteModule('planning', 'TripListPage');
const MyTripsSkeleton = loadRemoteModule('planning', 'TripListSkeleton');

const SkeletonFallback = () => (
  <React.Suspense fallback={<UserAppRemoteSuspenseFallback />}>
    <MyTripsSkeleton />
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
          <MyTripsApp />
        </React.Suspense>
      </AuthRemoteGate>
    </RemoteErrorBoundary>
  );
}
