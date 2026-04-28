'use client';

import React from 'react';

import * as NexploringUi from '@gsrosa/nexploring-ui';
import * as ReactQuery from '@tanstack/react-query';
import * as LucideReact from 'lucide-react';
import * as ReactDOM from 'react-dom';
import * as ReactRouterDom from 'react-router-dom';
import * as Zustand from 'zustand';

// ── Remote URLs ────────────────────────────────────────────────────────────────

type RemoteKey = 'aiAssistant' | 'userApp' | 'paymentApp';

const REMOTE_ENTRY_URLS: Record<RemoteKey, string> = {
  aiAssistant:
    process.env.NEXT_PUBLIC_REMOTE_AI_ASSISTANT_URL ??
    'http://localhost:3002/remoteEntry.js',
  userApp:
    process.env.NEXT_PUBLIC_REMOTE_USER_APP_URL ??
    'http://localhost:3003/remoteEntry.js',
  paymentApp:
    process.env.NEXT_PUBLIC_REMOTE_PAYMENT_APP_URL ??
    'http://localhost:3004/remoteEntry.js',
};

// ── MF container interface ─────────────────────────────────────────────────────

type MFContainer = {
  init: (sharedScope: Record<string, unknown>) => Promise<void> | void;
  get: (module: string) => Promise<() => { default: React.ComponentType }>;
};

// ── Runtime loader ─────────────────────────────────────────────────────────────
//
// Webpack MF remoteEntry.js is a UMD script that assigns `var <name> = { init, get }`
// at the top level. When loaded via import() it runs in ES module scope where `var`
// is module-scoped (not global), so window[name] is never set.
// Loading via <script> tag runs in global scope, making window[name] available.

const loadedScripts = new Set<string>();

function loadScript(url: string): Promise<void> {
  if (loadedScripts.has(url)) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = url;
    script.async = true;
    script.onload = () => { loadedScripts.add(url); resolve(); };
    script.onerror = () => reject(new Error(`[loadRemoteModule] Failed to load script: ${url}`));
    document.head.appendChild(script);
  });
}

const loadedContainers = new Map<RemoteKey, MFContainer>();

async function getContainer(remoteName: RemoteKey): Promise<MFContainer> {
  const cached = loadedContainers.get(remoteName);
  if (cached) return cached;

  const url = REMOTE_ENTRY_URLS[remoteName];

  // Load remoteEntry.js as a script tag so the UMD container registers on window.
  await loadScript(url);

  const win = window as unknown as Record<string, unknown>;
  const container = win[remoteName] as MFContainer | undefined;

  if (
    !container ||
    typeof container.init !== 'function' ||
    typeof container.get !== 'function'
  ) {
    throw new Error(
      `[loadRemoteModule] MF container not found for "${remoteName}". ` +
        `Check that the MFE server at ${url} is running and exporting { init, get }.`,
    );
  }

  // Pass the shell's React/ReactDOM to the remote's shared scope so
  // vite-plugin-federation uses a single React instance instead of the
  // remote's own bundled copy. Without this, hooks throw "null (reading
  // 'useState')" because fiber tree and hook dispatcher come from different
  // React copies.
  const reactVersion = React.version;
  const sharedScope = {
    react: {
      [reactVersion]: {
        get: () => Promise.resolve(() => React),
        loaded: true,
        from: 'shell',
        eager: false,
      },
    },
    'react-dom': {
      [reactVersion]: {
        get: () => Promise.resolve(() => ReactDOM),
        loaded: true,
        from: 'shell',
        eager: false,
      },
    },
    // Share react-router-dom so MFEs that use useLocation/NavLink/Outlet receive
    // the same Router context that the shell's RouterProvider creates.
    // Version '7.0.0' satisfies the remote's requiredVersion '^7.0.0'.
    'react-router-dom': {
      '7.0.0': {
        get: () => Promise.resolve(() => ReactRouterDom),
        loaded: true,
        from: 'shell',
        eager: false,
      },
    },
    // Share zustand so MFEs that declare it singleton don't bundle their own
    // copy, which would call useSyncExternalStore against a null React reference
    // before the shared scope is initialised.
    zustand: {
      '5.0.0': {
        get: () => Promise.resolve(() => Zustand),
        loaded: true,
        from: 'shell',
        eager: false,
      },
    },
    // Share @tanstack/react-query for the same reason.
    '@tanstack/react-query': {
      '5.0.0': {
        get: () => Promise.resolve(() => ReactQuery),
        loaded: true,
        from: 'shell',
        eager: false,
      },
    },
    // Share lucide-react so all MFEs use the same icon module and avoid a
    // duplicate bundle (each MFE declares it singleton: true).
    'lucide-react': {
      '1.8.0': {
        get: () => Promise.resolve(() => LucideReact),
        loaded: true,
        from: 'shell',
        eager: false,
      },
    },
    // Share @gsrosa/nexploring-ui for the same reason (requiredVersion: false in MFEs).
    '@gsrosa/nexploring-ui': {
      '0.1.0': {
        get: () => Promise.resolve(() => NexploringUi),
        loaded: true,
        from: 'shell',
        eager: false,
      },
    },
  };
  await container.init(sharedScope);
  loadedContainers.set(remoteName, container);
  return container;
}

// ── Public API ─────────────────────────────────────────────────────────────────

const lazyCache = new Map<string, React.LazyExoticComponent<React.ComponentType>>();

export function loadRemoteModule(
  remoteName: RemoteKey,
  exposedModule: string,
): React.LazyExoticComponent<React.ComponentType> {
  const key = `${remoteName}/${exposedModule}`;
  const cached = lazyCache.get(key);
  if (cached) return cached;

  const component = React.lazy(async () => {
    const container = await getContainer(remoteName);
    const factory = await container.get(`./${exposedModule}`);
    // Webpack MF factory() returns the module. React.lazy needs { default: ComponentType },
    // so normalise both shapes (direct component or { default: component }).
    const mod = factory() as React.ComponentType | { default: React.ComponentType };
    if (mod !== null && typeof mod === 'object' && 'default' in mod) {
      return mod as { default: React.ComponentType };
    }
    return { default: mod as React.ComponentType };
  });

  lazyCache.set(key, component);
  return component;
}
