import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { axe } from 'vitest-axe';

import { BottomNav } from '@/components/nav/bottom-nav';

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

vi.mock('next/link', () => ({
  default: ({
    href,
    children,
    ...props
  }: {
    href: string;
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe('BottomNav', () => {
  it('should have no serious accessibility violations', async () => {
    const { container } = render(<BottomNav />);
    expect((await axe(container)).violations).toEqual([]);
  });
});
