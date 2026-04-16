import { Suspense } from 'react';
import { Navigate, createBrowserRouter } from 'react-router-dom';

import { ShellLayout } from '@/components/shell-layout';
import { AuthRemoteGate } from '@/features/auth/auth-remote-gate';
import { HomePage } from '@/features/home';
import { NotFoundPage } from '@/features/not-found/not-found-page';
import { loadRemoteModule } from '@/microfrontends/load-remote-module';
import { getEnabledMicrofrontends } from '@/microfrontends/registry';
import { RemoteRoute } from '@/microfrontends/remote-route';
import { ROUTES } from '@/shared/constants/shell-routes';

const toRelativeSplat = (absolutePath: string): string => {
  return absolutePath.startsWith('/') ? absolutePath.slice(1) : absolutePath;
};

// ─── Profile layout + pages (remote) ─────────────────────────────────────────

const ProfileLayout = loadRemoteModule('userApp', 'ProfileLayout');
const ProfileAboutPage = loadRemoteModule('userApp', 'ProfileAboutPage');
const ProfilePasswordPage = loadRemoteModule('userApp', 'ProfilePasswordPage');
const ProfilePreferencesPage = loadRemoteModule('userApp', 'ProfilePreferencesPage');
const BillingPage = loadRemoteModule('paymentApp', 'BillingPage');

const ProfileLayoutSkeleton = () => (
  <div className="flex min-h-[calc(100dvh-60px)] w-full animate-pulse flex-col gap-0 bg-neutral-800/40 md:flex-row">
    <div className="w-56 shrink-0 border-r border-neutral-700 bg-neutral-800" />
    <div className="flex-1 p-10">
      <div className="mb-4 h-6 w-48 rounded-lg bg-neutral-700" />
      <div className="h-4 w-72 rounded bg-neutral-700" />
    </div>
  </div>
);

const profileRoute = {
  path: 'profile',
  element: (
    <AuthRemoteGate remoteLabel="Profile">
      <Suspense fallback={<ProfileLayoutSkeleton />}>
        <ProfileLayout />
      </Suspense>
    </AuthRemoteGate>
  ),
  children: [
    { index: true, element: <Navigate to="about" replace /> },
    {
      path: 'about',
      element: (
        <Suspense fallback={null}>
          <ProfileAboutPage />
        </Suspense>
      ),
    },
    {
      path: 'password',
      element: (
        <Suspense fallback={null}>
          <ProfilePasswordPage />
        </Suspense>
      ),
    },
    {
      path: 'billing',
      element: (
        <Suspense fallback={null}>
          <BillingPage />
        </Suspense>
      ),
    },
    {
      path: 'preferences',
      element: (
        <Suspense fallback={null}>
          <ProfilePreferencesPage />
        </Suspense>
      ),
    },
  ],
};

// ─── Shell children ────────────────────────────────────────────────────────────

const shellChildren = [
  { index: true, element: <HomePage /> },
  profileRoute,
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
