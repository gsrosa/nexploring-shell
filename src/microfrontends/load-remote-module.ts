import React from 'react';

type ModuleImportFn = () => Promise<{ default: React.ComponentType }>;

const remoteImportMap: Record<string, ModuleImportFn> = {
  'searchApp/App': () => import('searchApp/App'),
  'searchApp/SearchWidget': () => import('searchApp/SearchWidget'),
  'aiAssistant/App': () => import('aiAssistant/App'),
  'aiAssistant/ChatWidget': () => import('aiAssistant/ChatWidget'),
  'aiAssistant/Skeleton': () => import('aiAssistant/Skeleton'),
  'userApp/App': () => import('userApp/App'),
  'userApp/Skeleton': () => import('userApp/Skeleton'),
  'paymentApp/App': () => import('paymentApp/App'),
  'paymentApp/Skeleton': () => import('paymentApp/Skeleton'),
};

// Module-level cache — lazy() must never be called twice for the same key.
// A second lazy() call creates a NEW exotic component type, causing Suspense
// to re-fire "Loading remote…" on every navigation.
const lazyCache = new Map<string, React.LazyExoticComponent<React.ComponentType>>();

export const loadRemoteModule = (
  remoteName: string,
  exposedModule: string,
): React.LazyExoticComponent<React.ComponentType> => {
  const key = `${remoteName}/${exposedModule}`;

  const cached = lazyCache.get(key);
  if (cached) return cached;

  const importFn = remoteImportMap[key];
  if (!importFn) {
    throw new Error(
      `[loadRemoteModule] Unknown remote module: "${key}". ` +
        'Register it in the remoteImportMap, vite-env.d.ts, and the MFE registry.',
    );
  }

  const component = React.lazy(importFn);
  lazyCache.set(key, component);
  return component;
};
