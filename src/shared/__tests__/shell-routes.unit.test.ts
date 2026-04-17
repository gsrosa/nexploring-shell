import { describe, expect, it } from 'vitest';

import { ROUTES } from '@/shared/constants/shell-routes';

describe('ROUTES', () => {
  it('should use stable profile and assistant paths', () => {
    expect(ROUTES.PROFILE_ABOUT).toBe('/profile/about');
    expect(ROUTES.PROFILE_PASSWORD).toBe('/profile/password');
    expect(ROUTES.ASSISTANT).toBe('/assistant');
    expect(ROUTES.MY_TRIPS).toBe('/my-trips');
  });
});
