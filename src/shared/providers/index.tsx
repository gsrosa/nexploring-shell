import { AtlasProvider } from '@gsrosa/atlas-ui';
import { RouterProvider } from 'react-router-dom';
import { QueryProvider } from './query-provider';
import { ErrorBoundary } from './error-boundary';
import { router } from '@/app/router';

export function AppProviders() {
  return (
    <AtlasProvider>
      <ErrorBoundary>
        <QueryProvider>
          <RouterProvider router={router} />
        </QueryProvider>
      </ErrorBoundary>
    </AtlasProvider>
  );
}
