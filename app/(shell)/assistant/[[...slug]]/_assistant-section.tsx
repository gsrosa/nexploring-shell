'use client';

import React from 'react';

import { AuthRemoteGate } from '@/features/auth/auth-remote-gate';

import { RemoteErrorBoundary } from '@/components/remote-error-boundary';
import { UserAppRemoteSuspenseFallback } from '@/components/user-app-remote-suspense-fallback';
import { loadRemoteModule } from '@/microfrontends/load-remote-module';

const AiAssistantApp = loadRemoteModule('planning', 'TripCreationPage');
const AiAssistantSkeleton = loadRemoteModule(
  'planning',
  'TripCreationSkeleton',
);

const SkeletonFallback = () => (
  <React.Suspense fallback={<UserAppRemoteSuspenseFallback />}>
    <AiAssistantSkeleton />
  </React.Suspense>
);

export default function AssistantSection() {
  return (
    <RemoteErrorBoundary remoteName="AI Assistant">
      <AuthRemoteGate
        remoteLabel="AI Assistant"
        loadingFallback={<SkeletonFallback />}
      >
        <React.Suspense fallback={<SkeletonFallback />}>
          <AiAssistantApp />
        </React.Suspense>
      </AuthRemoteGate>
    </RemoteErrorBoundary>
  );
}
