import { NexploringProvider } from '@gsrosa/nexploring-ui';
import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { axe } from 'vitest-axe';

import { TopNav } from '@/components/top-nav';

// ── Mocks ──────────────────────────────────────────────────────────────────

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), back: vi.fn(), refresh: vi.fn() }),
}));

vi.mock('next/link', () => ({
  default: ({ href, children, ...props }: { href: string; children: React.ReactNode; [key: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

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

vi.mock('@/trpc/client', () => ({
  useTrpc: () => ({
    auth: {
      signOut: {
        mutationOptions: () => ({
          mutationKey: ['mock', 'auth', 'signOut'],
          mutationFn: async () => ({}),
        }),
      },
    },
    users: { me: { queryFilter: () => ({ queryKey: ['users', 'me'] }) } },
    travelerProfile: {
      get: { queryFilter: () => ({ queryKey: ['travelerProfile', 'get'] }) },
    },
  }),
}));

vi.mock('@tanstack/react-query', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@tanstack/react-query')>();
  return {
    ...actual,
    useMutation: () => ({ mutate: vi.fn(), isPending: false }),
    useQueryClient: () => ({
      invalidateQueries: vi.fn().mockResolvedValue(undefined),
    }),
  };
});

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: 'en-US', changeLanguage: vi.fn() },
  }),
}));

// ── Tests ──────────────────────────────────────────────────────────────────

describe('TopNav', () => {
  it('should have no serious accessibility violations when the visitor is logged out', async () => {
    sessionState.value = {
      isAuthenticated: false,
      isLoading: false,
      profile: null,
      isUnauthorized: false,
      refetch: vi.fn(),
    };
    const { container } = render(
      <NexploringProvider>
        <TopNav />
      </NexploringProvider>,
    );
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
    const { container } = render(
      <NexploringProvider>
        <TopNav />
      </NexploringProvider>,
    );
    expect((await axe(container)).violations).toEqual([]);
  });
});
