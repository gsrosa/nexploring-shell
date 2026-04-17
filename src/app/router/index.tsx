import { createBrowserRouter } from 'react-router-dom';

import { buildShellRoutes } from '@/app/router/build-shell-routes';

export { buildShellRoutes } from '@/app/router/build-shell-routes';

export const router = createBrowserRouter(buildShellRoutes());
