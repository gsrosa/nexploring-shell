import { createBrowserRouter } from 'react-router-dom';
import { ShellLayout } from '@/components/shell-layout';
import { RemoteRoute } from '@/microfrontends/remote-route';
import {
  getEnabledMicrofrontends,
  getMicrofrontendComponent,
} from '@/microfrontends/registry';
import { ROUTES } from '@/shared/constants/shell-routes';
import { HomePage } from '@/features/home';

/**
 * Child routes under ShellLayout:
 * - Index (/) → HomePage
 * - /search/* → searchApp (Search MFE)
 * - /assistant/* → aiAssistant (AI Assistant MFE)
 * - /user/* → userApp (atlas-user MFE)
 */
const shellChildren = [
  { index: true, element: <HomePage /> },
  ...getEnabledMicrofrontends().map((mfe) => ({
    path: mfe.routePath,
    element: (
      <RemoteRoute
        name={mfe.name}
        module={getMicrofrontendComponent(mfe.remoteName)}
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
