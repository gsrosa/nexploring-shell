import { render } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { describe, it, expect } from 'vitest';

import { SocialProofSection } from '@/features/home/components/social-proof-section';

describe('SocialProofSection', () => {
  it('should have no serious accessibility violations when rendered', async () => {
    const { container } = render(<SocialProofSection />);
    expect((await axe(container)).violations).toEqual([]);
  });
});
