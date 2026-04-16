import { AtlasProvider } from '@gsrosa/atlas-ui';
import { RouterProvider } from 'react-router-dom';

import { AuthShellEffects } from '@/features/auth/auth-shell-effects';
import { LoginModal } from '@/features/auth/login-modal';
import { router } from '@/app/router';

import { ErrorBoundary } from './error-boundary';
import { QueryProvider } from './query-provider';

export const AppProviders = () => {
  return (
    <AtlasProvider>
      <ErrorBoundary>
        <QueryProvider>
          <AuthShellEffects />
          <LoginModal />
          <RouterProvider router={router} />
        </QueryProvider>
      </ErrorBoundary>
    </AtlasProvider>
  );
};
