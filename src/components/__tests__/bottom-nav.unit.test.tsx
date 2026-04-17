import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { axe } from 'vitest-axe';
import { describe, it, expect } from 'vitest';

import { BottomNav } from '@/components/bottom-nav';

describe('BottomNav', () => {
  it('should have no serious accessibility violations when rendered inside the router', async () => {
    const { container } = render(
      <MemoryRouter>
        <BottomNav />
      </MemoryRouter>,
    );
    expect((await axe(container)).violations).toEqual([]);
  });
});
