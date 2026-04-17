import { AtlasProvider } from '@gsrosa/atlas-ui';
import { render, screen, waitFor } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';

import { buildShellRoutes } from '@/app/router/build-shell-routes';

vi.mock('@/shared/services/monitoring', () => ({
  monitoring: { captureException: vi.fn() },
}));

vi.mock('@/microfrontends/load-remote-module', async () => {
  const ReactMod = await import('react');
  const { Outlet } = await import('react-router-dom');

  const ProfileLayoutStub = () => (
    <div>
      <p>profile-layout-marker</p>
      <Outlet />
    </div>
  );

  return {
    loadRemoteModule: vi.fn((remoteName: string, exposedModule: string) => {
      if (remoteName === 'userApp' && exposedModule === 'ProfileLayout') {
        return ReactMod.lazy(() =>
          Promise.resolve({
            default: ProfileLayoutStub,
          }),
        );
      }
      const Page = () => (
        <main>
          <h1>Remote stub</h1>
          <p>{`${remoteName} ${exposedModule}`}</p>
        </main>
      );
      return ReactMod.lazy(() =>
        Promise.resolve({
          default: Page,
        }),
      );
    }),
  };
});

vi.mock('@/features/traveler-profile/traveler-profile-sync', () => ({
  TravelerProfileSync: () => null,
}));

vi.mock('@/components/purchase-modal', () => ({
  PurchaseModal: () => null,
}));

vi.mock('@/features/auth/use-session', () => ({
  useSession: () => ({
    isAuthenticated: true,
    isLoading: false,
    profile: {
      id: 'u1',
      first_name: 'Alex',
      last_name: 'River',
      email: 'alex@example.com',
      display_name: null,
    },
    isUnauthorized: false,
    refetch: vi.fn(),
  }),
}));

vi.mock('@/features/auth/auth-ui-store', () => ({
  useAuthUiStore: (selector: (s: { openLogin: () => void }) => unknown) =>
    selector({ openLogin: vi.fn() }),
}));

vi.mock('@/lib/trpc', () => ({
  trpc: {
    useUtils: () => ({
      users: { me: { invalidate: vi.fn() } },
      travelerProfile: { get: { invalidate: vi.fn() } },
    }),
    auth: {
      signOut: {
        useMutation: () => ({ mutate: vi.fn(), isPending: false }),
      },
    },
  },
}));

const renderAt = (initialPath: string) => {
  const router = createMemoryRouter(buildShellRoutes(), {
    initialEntries: [initialPath],
  });
  render(
    <AtlasProvider>
      <RouterProvider router={router} />
    </AtlasProvider>,
  );
  return { router };
};

describe('shell routing', () => {
  it(
    'should render the home hero when the pathname is /',
    async () => {
      renderAt('/');
      expect(
        await screen.findByRole('heading', {
          name: /Your trips, planned by artificial intelligence that understands you/i,
        }),
      ).toBeInTheDocument();
    },
    15_000,
  );

  it('should redirect /profile to /profile/about', async () => {
    const { router } = renderAt('/profile');
    await waitFor(() => expect(router.state.location.pathname).toBe('/profile/about'));
    expect(await screen.findByText(/userApp ProfileAboutPage/)).toBeInTheDocument();
  });

  it('should render the assistant remote stub when the user visits /assistant', async () => {
    renderAt('/assistant');
    expect(await screen.findByText(/aiAssistant App/)).toBeInTheDocument();
  });

  it('should render the My Trips remote stub when the user visits /my-trips', async () => {
    renderAt('/my-trips');
    expect(await screen.findByText(/aiAssistant MyTripsApp/)).toBeInTheDocument();
  });
});
