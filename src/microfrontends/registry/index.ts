import type { ComponentType, LazyExoticComponent } from 'react';
import type { FeatureFlagKey } from '@/config/feature-flags';
import { isFeatureEnabled } from '@/config/feature-flags';
import { loadRemoteModule } from '@/microfrontends/load-remote-module';
import { ROUTES } from '@/shared/constants/shell-routes';

interface MicrofrontendConfig {
  name: string;
  remoteName: string;
  exposedModule: string;
  skeletonModule?: string;
  routePath: string;
  navPath: string;
  navigationLabel: string;
  featureFlag: FeatureFlagKey;
  /** When true, shell shows the remote only if the user has a valid session (tRPC users.me). */
  requireAuth?: boolean;
}

export const microfrontendRegistry: Record<string, MicrofrontendConfig> = {
  searchApp: {
    name: 'Search',
    remoteName: 'searchApp',
    exposedModule: 'App',
    routePath: ROUTES.SEARCH_SPLAT,
    navPath: ROUTES.SEARCH,
    navigationLabel: 'Search',
    featureFlag: 'enableSearchApp',
  },
  aiAssistant: {
    name: 'AI Assistant',
    remoteName: 'aiAssistant',
    exposedModule: 'App',
    skeletonModule: 'Skeleton',
    routePath: ROUTES.ASSISTANT_SPLAT,
    navPath: ROUTES.ASSISTANT,
    navigationLabel: 'AI Assistant',
    featureFlag: 'enableAIAssistant',
    requireAuth: true,
  },
  userApp: {
    name: 'User',
    remoteName: 'userApp',
    exposedModule: 'App',
    skeletonModule: 'Skeleton',
    routePath: ROUTES.USER_SPLAT,
    navPath: ROUTES.USER,
    navigationLabel: 'Account',
    featureFlag: 'enableUserApp',
    requireAuth: true,
  },
};

export function getEnabledMicrofrontends(): MicrofrontendConfig[] {
  return Object.values(microfrontendRegistry).filter((mfe) =>
    isFeatureEnabled(mfe.featureFlag),
  );
}

export function getAllMicrofrontends(): MicrofrontendConfig[] {
  return Object.values(microfrontendRegistry);
}

export function getMicrofrontendComponent(
  key: string,
): LazyExoticComponent<ComponentType> {
  const config = microfrontendRegistry[key];
  if (!config) {
    throw new Error(`[registry] Unknown microfrontend: "${key}"`);
  }
  return loadRemoteModule(config.remoteName, config.exposedModule);
}

export function getMicrofrontendSkeleton(
  key: string,
): LazyExoticComponent<ComponentType> | undefined {
  const config = microfrontendRegistry[key];
  if (!config?.skeletonModule) return undefined;
  return loadRemoteModule(config.remoteName, config.skeletonModule);
}

export type { MicrofrontendConfig };
