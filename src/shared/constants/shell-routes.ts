/**
 * Shell route paths. Used by router, nav, and microfrontend registry.
 */
export const ROUTES = {
  HOME: '/',
  SEARCH: '/search',
  SEARCH_SPLAT: '/search/*',
  ASSISTANT: '/assistant',
  ASSISTANT_SPLAT: '/assistant/*',
  PROFILE: '/profile',
  PROFILE_SPLAT: '/profile/*',
  /** Full-screen traveler onboarding (no shell chrome). */
  PROFILE_ONBOARDING: '/profile/onboarding',
  /** Calm profile settings (same remote; chrome on). */
  PROFILE_SETTINGS: '/profile/settings',
  MY_TRIPS: '/my-trips',
  MY_TRIPS_SPLAT: '/my-trips/*',
  PROFILE_BILLING: '/profile/billing',
  PROFILE_BILLING_SPLAT: '/profile/billing/*',
} as const;

export type ShellRoutePath = (typeof ROUTES)[keyof typeof ROUTES];
