/**
 * Shell route paths. Used by router, nav, and microfrontend registry.
 */
export const ROUTES = {
  HOME: '/',
  SEARCH: '/search',
  SEARCH_SPLAT: '/search/*',
  ASSISTANT: '/assistant',
  ASSISTANT_SPLAT: '/assistant/*',
  PROJECTS: '/projects',
  TASKS: '/tasks',
  ANALYTICS: '/analytics',
  SETTINGS: '/settings',
  USER: '/user',
  USER_SPLAT: '/user/*',
} as const;

export type ShellRoutePath = (typeof ROUTES)[keyof typeof ROUTES];
