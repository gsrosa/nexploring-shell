import React from 'react';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ErrorBoundary } from '@/shared/providers/error-boundary';

vi.mock('@/shared/services/monitoring', () => ({
  monitoring: {
    captureException: vi.fn(),
  },
}));

let shouldAppChildThrow = true;

const AppChildUnderTest = () => {
  React.useLayoutEffect(() => {
    if (shouldAppChildThrow) {
      shouldAppChildThrow = false;
      throw new Error('Simulated app failure');
    }
  }, []);

  return <p>App recovered</p>;
};

describe('ErrorBoundary', () => {
  beforeEach(() => {
    shouldAppChildThrow = true;
  });

  it('should show an alert with a home redirect when a descendant throws', async () => {
    const assignSpy = vi.spyOn(window.location, 'assign').mockImplementation(() => undefined);
    const user = userEvent.setup();
    render(
      <ErrorBoundary>
        <AppChildUnderTest />
      </ErrorBoundary>,
    );

    expect(await screen.findByRole('alert')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /Something went wrong/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Return to the home page/i),
    ).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /Go to home/i }));

    expect(assignSpy).toHaveBeenCalledWith('/');
    assignSpy.mockRestore();
  });
});
