import { NexploringProvider } from '@gsrosa/nexploring-ui';
import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { axe } from 'vitest-axe';

import { ShellLayout } from '@/components/shell-layout';

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

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: 'en-US', changeLanguage: vi.fn() },
  }),
}));

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
    useQuery: () => ({
      data: undefined,
      isPending: false,
      isError: false,
      error: null,
    }),
  };
});

// ── Tests ──────────────────────────────────────────────────────────────────

describe('ShellLayout', () => {
  it('should have no serious accessibility violations when the outlet renders placeholder content', async () => {
    const { container } = render(
      <NexploringProvider>
        <ShellLayout>
          <div>Page content</div>
        </ShellLayout>
      </NexploringProvider>,
    );
    expect((await axe(container)).violations).toEqual([]);
  });
});
