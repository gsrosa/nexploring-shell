import React from 'react';

import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';

import { RemoteRoute } from '@/microfrontends/remote-route';

vi.mock('@/shared/services/monitoring', () => ({
  monitoring: {
    captureException: vi.fn(),
  },
}));

describe('RemoteRoute', () => {
  // Covers sync render failures after the lazy import resolves. A lazy factory that
  // rejects (network / chunk load) can surface via Suspense instead of this boundary.
  it('should surface RemoteErrorBoundary UI when the lazy module throws after resolve', async () => {
    const ThrowingLazy = React.lazy(() =>
      Promise.resolve({
        default: () => {
          throw new Error('Simulated remote crash');
        },
      }),
    );

    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route
            path="/"
            element={
              <RemoteRoute
                name="AI Assistant"
                remoteName="aiAssistant"
                module={ThrowingLazy}
              />
            }
          />
        </Routes>
      </MemoryRouter>,
    );

    expect(await screen.findByRole('alert')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /Failed to load AI Assistant/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Simulated remote crash/)).toBeInTheDocument();
  });

  it('should render the remote module when the lazy import resolves cleanly', async () => {
    const HealthyLazy = React.lazy(() =>
      Promise.resolve({
        default: () => <p>Healthy remote content</p>,
      }),
    );

    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route
            path="/"
            element={
              <RemoteRoute
                name="AI Assistant"
                remoteName="aiAssistant"
                module={HealthyLazy}
              />
            }
          />
        </Routes>
      </MemoryRouter>,
    );

    expect(await screen.findByText(/Healthy remote content/)).toBeInTheDocument();
  });
});
