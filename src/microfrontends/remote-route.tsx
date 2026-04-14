import { Suspense } from 'react';
import type { ComponentType, LazyExoticComponent, ReactNode } from 'react';
import { AuthRemoteGate } from '@/features/auth/auth-remote-gate';
import { RemoteErrorBoundary } from './remote-error-boundary';

interface RemoteRouteProps {
  name: string;
  module: LazyExoticComponent<ComponentType>;
  skeleton?: LazyExoticComponent<ComponentType>;
  requireAuth?: boolean;
}

function PageShimmer() {
  return <div className="min-h-[calc(100dvh-60px)] animate-pulse bg-neutral-100 dark:bg-neutral-900 md:min-h-screen" />;
}

function buildFallback(Skeleton?: LazyExoticComponent<ComponentType>): ReactNode {
  if (!Skeleton) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center gap-2 px-6 text-neutral-500 text-sm">
        <span className="inline-block h-8 w-8 rounded-full border-2 border-neutral-200 border-t-primary-400 animate-spin" />
        Loading remote…
      </div>
    );
  }
  return (
    <Suspense fallback={<PageShimmer />}>
      <Skeleton />
    </Suspense>
  );
}

export function RemoteRoute({ name, module: Module, skeleton, requireAuth }: RemoteRouteProps) {
  const fallback = buildFallback(skeleton);

  const remote = (
    <Suspense fallback={fallback}>
      <Module />
    </Suspense>
  );

  return (
    <RemoteErrorBoundary remoteName={name}>
      {requireAuth ? (
        <AuthRemoteGate remoteLabel={name} loadingFallback={fallback}>
          {remote}
        </AuthRemoteGate>
      ) : remote}
    </RemoteErrorBoundary>
  );
}
