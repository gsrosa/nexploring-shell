import { lazy } from 'react';
import type { ComponentType, LazyExoticComponent } from 'react';

type ModuleImportFn = () => Promise<{ default: ComponentType }>;

const remoteImportMap: Record<string, ModuleImportFn> = {
  'searchApp/App': () => import('searchApp/App'),
  'searchApp/SearchWidget': () => import('searchApp/SearchWidget'),
  'aiAssistant/App': () => import('aiAssistant/App'),
  'aiAssistant/ChatWidget': () => import('aiAssistant/ChatWidget'),
};

export function loadRemoteModule(
  remoteName: string,
  exposedModule: string,
): LazyExoticComponent<ComponentType> {
  const key = `${remoteName}/${exposedModule}`;
  const importFn = remoteImportMap[key];

  if (!importFn) {
    throw new Error(
      `[loadRemoteModule] Unknown remote module: "${key}". ` +
        'Register it in the remoteImportMap, vite-env.d.ts, and the MFE registry.',
    );
  }

  return lazy(importFn);
}
