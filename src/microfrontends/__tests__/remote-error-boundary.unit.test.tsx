import React from 'react';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { RemoteErrorBoundary } from '@/components/remote-error-boundary';

vi.mock('@/shared/services/monitoring', () => ({
  monitoring: {
    captureException: vi.fn(),
  },
}));

let shouldRemoteChildThrow = true;

const RemoteChildUnderTest = () => {
  React.useLayoutEffect(() => {
    if (shouldRemoteChildThrow) {
      shouldRemoteChildThrow = false;
      throw new Error('Simulated remote failure');
    }
  }, []);

  return <p>Remote recovered</p>;
};

describe('RemoteErrorBoundary', () => {
  beforeEach(() => {
    shouldRemoteChildThrow = true;
  });

  it('should show an alert with retry when a child throws on render', async () => {
    const user = userEvent.setup();
    render(
      <RemoteErrorBoundary remoteName="Test Remote">
        <RemoteChildUnderTest />
      </RemoteErrorBoundary>,
    );

    expect(await screen.findByRole('alert')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /Something went wrong/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/temporarily unavailable/i)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /Try again/i }));

    expect(await screen.findByText(/Remote recovered/)).toBeInTheDocument();
  });
});
