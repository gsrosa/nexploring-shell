import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { axe } from 'vitest-axe';
import { describe, it, expect, vi } from 'vitest';

import { HeroSection } from '@/features/home/components/hero-section';

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

describe('HeroSection', () => {
  it(
    'should have no serious accessibility violations when the session is logged out',
    async () => {
      const { container } = render(
        <MemoryRouter>
          <HeroSection />
        </MemoryRouter>,
      );
      expect((await axe(container)).violations).toEqual([]);
    },
    30_000,
  );
});
