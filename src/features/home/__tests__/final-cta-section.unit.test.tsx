import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { axe } from 'vitest-axe';
import { describe, it, expect, vi } from 'vitest';

import { FinalCtaSection } from '@/features/home/components/final-cta-section';

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

describe('FinalCtaSection', () => {
  it('should have no serious accessibility violations when the visitor is logged out', async () => {
    const { container } = render(
      <MemoryRouter>
        <FinalCtaSection />
      </MemoryRouter>,
    );
    expect((await axe(container)).violations).toEqual([]);
  });
});
