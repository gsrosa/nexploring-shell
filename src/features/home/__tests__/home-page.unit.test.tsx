import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { axe } from 'vitest-axe';
import { describe, it, expect, vi } from 'vitest';

import { HomePage } from '@/features/home/home-page';

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

describe('HomePage', () => {
  it(
    'should have no serious accessibility violations when rendered for a logged-out visitor',
    async () => {
      const { container } = render(
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>,
      );
      expect((await axe(container)).violations).toEqual([]);
    },
    25_000,
  );
});
