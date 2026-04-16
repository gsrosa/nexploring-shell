import { createBrowserRouter } from 'react-router-dom';

import { ShellLayout } from '@/components/shell-layout';
import { HomePage } from '@/features/home';
import { NotFoundPage } from '@/features/not-found/not-found-page';
import { loadRemoteModule } from '@/microfrontends/load-remote-module';
import { getEnabledMicrofrontends } from '@/microfrontends/registry';
import { RemoteRoute } from '@/microfrontends/remote-route';
import { ROUTES } from '@/shared/constants/shell-routes';

const toRelativeSplat = (absolutePath: string): string => {
  return absolutePath.startsWith('/') ? absolutePath.slice(1) : absolutePath;
};

const shellChildren = [
  { index: true, element: <HomePage /> },
  ...getEnabledMicrofrontends().map((mfe) => ({
    path: toRelativeSplat(mfe.routePath),
    element: (
      <RemoteRoute
        key={mfe.routePath}
        name={mfe.name}
        remoteName={mfe.remoteName}
        module={loadRemoteModule(mfe.remoteName, mfe.exposedModule)}
        skeleton={mfe.skeletonModule ? loadRemoteModule(mfe.remoteName, mfe.skeletonModule) : undefined}
        requireAuth={mfe.requireAuth}
      />
    ),
  })),
  { path: '*', element: <NotFoundPage /> },
];

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <ShellLayout />,
    children: shellChildren,
  },
]);
