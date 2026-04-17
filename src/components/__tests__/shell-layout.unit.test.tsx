import { AtlasProvider } from '@gsrosa/atlas-ui';
import { render } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { axe } from 'vitest-axe';
import { describe, it, expect, vi } from 'vitest';

import { ShellLayout } from '@/components/shell-layout';

vi.mock('@/features/traveler-profile/traveler-profile-sync', () => ({
  TravelerProfileSync: () => null,
}));

vi.mock('@/components/purchase-modal', () => ({
  PurchaseModal: () => null,
}));

vi.mock('@/components/footer', () => ({
  Footer: () => (
    <footer>
      <span>Footer</span>
    </footer>
  ),
}));

vi.mock('@/features/auth/use-session', () => ({
  useSession: () => ({
    isAuthenticated: false,
    isLoading: false,
    profile: null,
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
    useUtils: () => ({}),
    auth: {
      signOut: {
        useMutation: () => ({ mutate: vi.fn(), isPending: false }),
      },
    },
  },
}));

describe('ShellLayout', () => {
  it('should have no serious accessibility violations when the outlet renders placeholder content', async () => {
    const router = createMemoryRouter(
      [
        {
          path: '/',
          element: <ShellLayout />,
          children: [{ index: true, element: <div>Page content</div> }],
        },
      ],
      { initialEntries: ['/'] },
    );
    const { container } = render(
      <AtlasProvider>
        <RouterProvider router={router} />
      </AtlasProvider>,
    );
    expect((await axe(container)).violations).toEqual([]);
  });
});
