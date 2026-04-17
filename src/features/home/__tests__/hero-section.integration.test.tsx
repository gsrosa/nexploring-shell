import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

import { HeroSection } from '@/features/home/components/hero-section';

vi.mock('@/features/auth/use-session', () => ({
  useSession: () => ({
    isAuthenticated: false,
    isLoading: false,
    profile: null,
  }),
}));

const openLogin = vi.fn();

vi.mock('@/features/auth/auth-ui-store', () => ({
  useAuthUiStore: (selector: (state: { openLogin: () => void }) => unknown) =>
    selector({ openLogin }),
}));

describe('HeroSection (integration)', () => {
  it('should show the hero headline and primary CTA when the session is idle', () => {
    render(
      <MemoryRouter>
        <HeroSection />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole('heading', {
        name: /Your trips, planned by artificial intelligence that understands you/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Start planning free/i })).toBeInTheDocument();
  });
});
