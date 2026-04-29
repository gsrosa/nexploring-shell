'use client';

import React from 'react';

import { AuthRemoteGate } from '@/features/auth/auth-remote-gate';

import { RemoteErrorBoundary } from '@/components/remote-error-boundary';
import { loadRemoteModule } from '@/microfrontends/load-remote-module';

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
