import { render } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { describe, it, expect } from 'vitest';

import { PrecisionSection } from '@/features/home/components/precision-section';

describe('PrecisionSection', () => {
  it('should have no serious accessibility violations when rendered', async () => {
    const { container } = render(<PrecisionSection />);
    expect((await axe(container)).violations).toEqual([]);
  });
});
