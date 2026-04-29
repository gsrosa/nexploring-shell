'use client';

import React from 'react';

import * as NexploringUi from '@gsrosa/nexploring-ui';
import * as ReactQuery from '@tanstack/react-query';
import * as LucideReact from 'lucide-react';
import * as ReactDOM from 'react-dom';
import * as ReactRouterDom from 'react-router-dom';
import * as Zustand from 'zustand';

import type {
  ExposedModules,
  RemoteKey,
} from '@/shared/constants/module-names';

const REMOTE_ENTRY_URLS: Record<RemoteKey, string> = {
  planning:
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

const loadedScripts = new Set<string>();

function loadScript(url: string): Promise<void> {
  if (loadedScripts.has(url)) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = url;
    script.async = true;
    script.onload = () => {
      loadedScripts.add(url);
      resolve();
    };
    script.onerror = () =>
      reject(new Error(`[loadRemoteModule] Failed to load script: ${url}`));
    document.head.appendChild(script);
  });
}

const loadedContainers = new Map<RemoteKey, MFContainer>();

type RemoteStyleElement = HTMLStyleElement | HTMLLinkElement;

const STYLE_ELEMENT_SELECTOR = 'style,link[rel="stylesheet"]';
const REMOTE_STYLE_ATTRIBUTE = 'data-nexploring-remote-style';

let hostStyleAnchor: RemoteStyleElement | null = null;
let remoteStyleOrderObserver: MutationObserver | null = null;
let isMovingRemoteStyles = false;
let latestRemoteName: RemoteKey | null = null;

function getHeadStyleElements(): RemoteStyleElement[] {
  if (typeof document === 'undefined') return [];

  return Array.from(
    document.head.querySelectorAll<RemoteStyleElement>(STYLE_ELEMENT_SELECTOR),
  );
}

function getHostStyleAnchor(
  styleCandidates = getHeadStyleElements(),
): RemoteStyleElement | null {
  if (typeof document === 'undefined') return null;

  if (hostStyleAnchor?.parentNode === document.head) return hostStyleAnchor;

  hostStyleAnchor =
    styleCandidates.find(
      (style) =>
        style.parentNode === document.head &&
        !style.hasAttribute(REMOTE_STYLE_ATTRIBUTE),
    ) ?? null;

  return hostStyleAnchor;
}

function getStyleElementsFromNode(node: Node): RemoteStyleElement[] {
  if (!(node instanceof Element)) return [];

  const styles: RemoteStyleElement[] = [];

  if (node.matches(STYLE_ELEMENT_SELECTOR)) {
    styles.push(node as RemoteStyleElement);
  }

  styles.push(
    ...Array.from(
      node.querySelectorAll<RemoteStyleElement>(STYLE_ELEMENT_SELECTOR),
    ),
  );

  return styles;
}

function moveRemoteStylesBeforeHostStyles(
  remoteStyles: RemoteStyleElement[],
  remoteName: string,
): void {
  if (typeof document === 'undefined' || remoteStyles.length === 0) return;

  const anchor = getHostStyleAnchor();

  if (!anchor) return;

  isMovingRemoteStyles = true;

  try {
    for (const style of remoteStyles) {
      if (style === anchor || style.parentNode !== document.head) continue;

      style.setAttribute(REMOTE_STYLE_ATTRIBUTE, remoteName);
      document.head.insertBefore(style, anchor);
    }
  } finally {
    isMovingRemoteStyles = false;
  }
}

function ensureRemoteStyleOrderObserver(): void {
  if (
    typeof document === 'undefined' ||
    typeof MutationObserver === 'undefined' ||
    remoteStyleOrderObserver
  ) {
    return;
  }

  remoteStyleOrderObserver = new MutationObserver((mutations) => {
    if (isMovingRemoteStyles) return;

    const addedStyles = mutations
      .flatMap((mutation) => Array.from(mutation.addedNodes))
      .flatMap(getStyleElementsFromNode)
      .filter((style) => !style.hasAttribute(REMOTE_STYLE_ATTRIBUTE));

    moveRemoteStylesBeforeHostStyles(
      addedStyles,
      latestRemoteName ?? 'unknown',
    );
  });

  remoteStyleOrderObserver.observe(document.head, { childList: true });
}

function moveNewRemoteStylesBeforeHostStyles(
  previousStyles: RemoteStyleElement[],
  remoteName: RemoteKey,
): void {
  if (typeof document === 'undefined' || previousStyles.length === 0) return;

  latestRemoteName = remoteName;
  getHostStyleAnchor(previousStyles);
  ensureRemoteStyleOrderObserver();

  const previousStyleSet = new Set<Element>(previousStyles);
  const newStyles = getHeadStyleElements().filter(
    (style) => !previousStyleSet.has(style),
  );

  moveRemoteStylesBeforeHostStyles(newStyles, remoteName);
}

async function getContainer(remoteName: RemoteKey): Promise<MFContainer> {
  const cached = loadedContainers.get(remoteName);
  if (cached) return cached;

  const url = REMOTE_ENTRY_URLS[remoteName];

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
    'react-router-dom': {
      '7.0.0': {
        get: () => Promise.resolve(() => ReactRouterDom),
        loaded: true,
        from: 'shell',
        eager: false,
      },
    },
    zustand: {
      '5.0.0': {
        get: () => Promise.resolve(() => Zustand),
        loaded: true,
        from: 'shell',
        eager: false,
      },
    },
    '@tanstack/react-query': {
      '5.0.0': {
        get: () => Promise.resolve(() => ReactQuery),
        loaded: true,
        from: 'shell',
        eager: false,
      },
    },
    'lucide-react': {
      '1.8.0': {
        get: () => Promise.resolve(() => LucideReact),
        loaded: true,
        from: 'shell',
        eager: false,
      },
    },
    '@gsrosa/nexploring-ui': {
      '1.0.0': {
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

const lazyCache = new Map<
  string,
  React.LazyExoticComponent<React.ComponentType>
>();

export function loadRemoteModule(
  remoteName: RemoteKey,
  exposedModule: ExposedModules,
): React.LazyExoticComponent<React.ComponentType> {
  const key = `${remoteName}/${exposedModule}`;
  const cached = lazyCache.get(key);
  if (cached) return cached;

  const component = React.lazy(async () => {
    const stylesBeforeRemoteModule = getHeadStyleElements();
    const container = await getContainer(remoteName);
    const factory = await container.get(`./${exposedModule}`);
    const mod = factory() as
      | React.ComponentType
      | { default: React.ComponentType };

    moveNewRemoteStylesBeforeHostStyles(stylesBeforeRemoteModule, remoteName);

    if (mod !== null && typeof mod === 'object' && 'default' in mod) {
      return mod as { default: React.ComponentType };
    }
    return { default: mod as React.ComponentType };
  });

  lazyCache.set(key, component);
  return component;
}
