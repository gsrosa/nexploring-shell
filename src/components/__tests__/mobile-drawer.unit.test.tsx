import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

// ── Mocks ──────────────────────────────────────────────────────────────────

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

vi.mock('next/link', () => ({
  default: ({
    href,
    children,
    onClick,
    className,
    ...props
  }: {
    href: string;
    children: React.ReactNode;
    onClick?: React.MouseEventHandler;
    className?: string;
    [key: string]: unknown;
  }) => (
    <a href={href} onClick={onClick} className={className} {...props}>
      {children}
    </a>
  ),
}));

vi.mock('@/config/feature-flags', () => ({
  isFeatureEnabled: () => true,
}));

const useSessionMock = vi.fn(() => ({
  isAuthenticated: false,
  isLoading: false,
}));

vi.mock('@/features/auth/use-session', () => ({
  useSession: () => useSessionMock(),
}));

vi.mock('@/features/auth/auth-ui-store', () => ({
  useAuthUiStore: (selector: (s: { openLogin: () => void }) => unknown) =>
    selector({ openLogin: vi.fn() }),
}));

vi.mock('@gsrosa/nexploring-ui', async (importOriginal) => {
  // eslint-disable-next-line @typescript-eslint/consistent-type-imports
  const actual = await importOriginal<typeof import('@gsrosa/nexploring-ui')>();
  return {
    ...actual,
    cn: (...args: unknown[]) => args.filter(Boolean).join(' '),
  };
});

import { MobileDrawer } from '../nav/mobile-drawer';

// ── Tests ──────────────────────────────────────────────────────────────────

describe('MobileDrawer', () => {
  beforeEach(() => {
    useSessionMock.mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
    });
  });

  it('is hidden when isOpen is false', () => {
    const onClose = vi.fn();
    render(<MobileDrawer isOpen={false} onClose={onClose} />);

    const panel = screen.getByRole('dialog', { name: /navigation menu/i });
    expect(panel.className).toContain('-translate-x-full');
  });

  it('is visible when isOpen is true', () => {
    render(<MobileDrawer isOpen={true} onClose={vi.fn()} />);

    const panel = screen.getByRole('dialog', { name: /navigation menu/i });
    expect(panel.className).toContain('translate-x-0');
  });

  it('calls onClose when the close button is clicked', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<MobileDrawer isOpen={true} onClose={onClose} />);

    await user.click(
      screen.getByRole('button', { name: /close navigation menu/i }),
    );

    expect(onClose).toHaveBeenCalledOnce();
  });

  it('calls onClose when the backdrop is clicked', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<MobileDrawer isOpen={true} onClose={onClose} />);

    const backdrop = document.querySelector(
      '[aria-hidden="true"]',
    ) as HTMLElement;
    await user.click(backdrop);

    expect(onClose).toHaveBeenCalledOnce();
  });

  it('calls onClose when Escape is pressed', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<MobileDrawer isOpen={true} onClose={onClose} />);

    await user.keyboard('{Escape}');

    expect(onClose).toHaveBeenCalledOnce();
  });

  it('does not call onClose on Escape when drawer is closed', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<MobileDrawer isOpen={false} onClose={onClose} />);

    await user.keyboard('{Escape}');

    expect(onClose).not.toHaveBeenCalled();
  });

  it('renders nav items: Explore, Plan Trip, My Trips', () => {
    useSessionMock.mockReturnValue({ isAuthenticated: true, isLoading: false });
    render(<MobileDrawer isOpen={true} onClose={vi.fn()} />);

    const nav = screen.getByRole('navigation', { name: /drawer navigation/i });
    expect(nav).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /explore/i })).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /plan trip/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /my trips/i })).toBeInTheDocument();
  });
});
