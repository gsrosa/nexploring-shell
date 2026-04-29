import React from 'react';

import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { RemoteRoute } from '@/components/remote-route';

// ── Mocks ──────────────────────────────────────────────────────────────────

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

vi.mock('@/shared/services/monitoring', () => ({
  monitoring: { captureException: vi.fn() },
}));

vi.mock('@/features/auth/use-session', () => ({
  useSession: () => ({
    isAuthenticated: true,
    isLoading: false,
    isUnauthorized: false,
  }),
}));

vi.mock('@/features/auth/auth-ui-store', () => ({
  useAuthUiStore: (selector: (s: { openLogin: () => void }) => unknown) =>
    selector({ openLogin: vi.fn() }),
}));

vi.mock('next/link', () => ({
  default: ({
    href,
    children,
  }: {
    href: string;
    children: React.ReactNode;
  }) => <a href={href}>{children}</a>,
}));

// ── Tests ──────────────────────────────────────────────────────────────────

describe('RemoteRoute', () => {
  it('should surface RemoteErrorBoundary UI when the lazy module throws after resolve', async () => {
    const ThrowingLazy = React.lazy(() =>
      Promise.resolve({
        default: () => {
          throw new Error('Simulated remote crash');
        },
      }),
    );

    render(
      <RemoteRoute
        name="AI Assistant"
        remoteName="aiAssistant"
        module={ThrowingLazy}
      />,
    );

    expect(await screen.findByRole('alert')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /Something went wrong/i }),
    ).toBeInTheDocument();
  });

  it('should render the remote module when the lazy import resolves cleanly', async () => {
    const HealthyLazy = React.lazy(() =>
      Promise.resolve({
        default: () => <p>Healthy remote content</p>,
      }),
    );

    render(
      <RemoteRoute
        name="AI Assistant"
        remoteName="aiAssistant"
        module={HealthyLazy}
      />,
    );

    expect(
      await screen.findByText(/Healthy remote content/),
    ).toBeInTheDocument();
  });
});
