import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { axe } from 'vitest-axe';
import { describe, it, expect, vi } from 'vitest';

import { DestinationsSection } from '@/features/home/components/destinations-section';

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

describe('DestinationsSection', () => {
  it('should have no serious accessibility violations when the visitor is logged out', async () => {
    const { container } = render(
      <MemoryRouter>
        <DestinationsSection />
      </MemoryRouter>,
    );
    expect((await axe(container)).violations).toEqual([]);
  });
});
