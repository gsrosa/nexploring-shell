import { Suspense } from 'react';
import type { ComponentType, LazyExoticComponent } from 'react';
import { RemoteErrorBoundary } from './remote-error-boundary';

interface RemoteRouteProps {
  name: string;
  module: LazyExoticComponent<ComponentType>;
}

function LoadingFallback() {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center gap-2 px-6 text-neutral-500 text-sm">
      <span className="inline-block h-8 w-8 rounded-full border-2 border-neutral-200 border-t-primary-400 animate-spin" />
      Loading remote…
    </div>
  );
}

export function RemoteRoute({ name, module: Module }: RemoteRouteProps) {
  return (
    <RemoteErrorBoundary remoteName={name}>
      <Suspense fallback={<LoadingFallback />}>
        <Module />
      </Suspense>
    </RemoteErrorBoundary>
  );
}
