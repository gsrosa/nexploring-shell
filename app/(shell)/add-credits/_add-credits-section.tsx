'use client';

import React from 'react';

import { AuthRemoteGate } from '@/features/auth/auth-remote-gate';

import { loadRemoteModule } from '@/microfrontends/load-remote-module';
import { RemoteErrorBoundary } from '@/microfrontends/remote-error-boundary';

const AddCreditsPage = loadRemoteModule('paymentApp', 'AddCreditsPage');

const SkeletonFallback = () => (
  <div className="min-h-[calc(100dvh-60px)] animate-pulse bg-neutral-800/40" />
);

export default function AddCreditsSection() {
  return (
    <RemoteErrorBoundary remoteName="Add Credits">
      <AuthRemoteGate
        remoteLabel="Add Credits"
        loadingFallback={<SkeletonFallback />}
      >
        <React.Suspense fallback={<SkeletonFallback />}>
          <AddCreditsPage />
        </React.Suspense>
      </AuthRemoteGate>
    </RemoteErrorBoundary>
  );
}
