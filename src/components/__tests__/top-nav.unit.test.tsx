import { AtlasProvider } from '@gsrosa/atlas-ui';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { axe } from 'vitest-axe';
import { describe, it, expect, vi } from 'vitest';

import { TopNav } from '@/components/top-nav';

type SessionValue = {
  isAuthenticated: boolean;
  isLoading: boolean;
  profile: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    display_name: string | null;
  } | null;
  isUnauthorized: boolean;
  refetch: () => void;
};

const sessionState = vi.hoisted(() => ({
  value: {
    isAuthenticated: false,
    isLoading: false,
    profile: null,
    isUnauthorized: false,
    refetch: vi.fn(),
  } as SessionValue,
}));

vi.mock('@/features/auth/use-session', () => ({
  useSession: () => sessionState.value,
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

const renderTopNav = () =>
  render(
    <AtlasProvider>
      <MemoryRouter>
        <TopNav />
      </MemoryRouter>
    </AtlasProvider>,
  );

describe('TopNav', () => {
  it('should have no serious accessibility violations when the visitor is logged out', async () => {
    sessionState.value = {
      isAuthenticated: false,
      isLoading: false,
      profile: null,
      isUnauthorized: false,
      refetch: vi.fn(),
    };
    const { container } = renderTopNav();
    expect((await axe(container)).violations).toEqual([]);
  });

  it('should have no serious accessibility violations when the visitor is signed in', async () => {
    sessionState.value = {
      isAuthenticated: true,
      isLoading: false,
      profile: {
        id: 'u1',
        first_name: 'Sam',
        last_name: 'Lee',
        email: 'sam@example.com',
        display_name: null,
      },
      isUnauthorized: false,
      refetch: vi.fn(),
    };
    const { container } = renderTopNav();
    expect((await axe(container)).violations).toEqual([]);
  });
});
