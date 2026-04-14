import { createBrowserRouter } from 'react-router-dom';
import { ShellLayout } from '@/components/shell-layout';
import { RemoteRoute } from '@/microfrontends/remote-route';
import {
  getEnabledMicrofrontends,
  getMicrofrontendComponent,
  getMicrofrontendSkeleton,
} from '@/microfrontends/registry';
import { ROUTES } from '@/shared/constants/shell-routes';
import { HomePage } from '@/features/home';

function toRelativeSplat(absolutePath: string): string {
  return absolutePath.startsWith('/') ? absolutePath.slice(1) : absolutePath;
}

const shellChildren = [
  { index: true, element: <HomePage /> },
  ...getEnabledMicrofrontends().map((mfe) => ({
    path: toRelativeSplat(mfe.routePath),
    element: (
      <RemoteRoute
        name={mfe.name}
        module={getMicrofrontendComponent(mfe.remoteName)}
        skeleton={getMicrofrontendSkeleton(mfe.remoteName)}
        requireAuth={mfe.requireAuth}
      />
    ),
  })),
];

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <ShellLayout />,
    children: shellChildren,
  },
]);
