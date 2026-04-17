import { render } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { describe, it, expect } from 'vitest';

import { HomeMetricStrip } from '@/features/home/components/home-metric-strip';

describe('HomeMetricStrip', () => {
  it('should have no serious accessibility violations when rendered', async () => {
    const { container } = render(<HomeMetricStrip />);
    expect((await axe(container)).violations).toEqual([]);
  });
});
