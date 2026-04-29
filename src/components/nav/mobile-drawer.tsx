'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@gsrosa/nexploring-ui';
import { CompassIcon, MapIcon, SparklesIcon, XIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { useSession } from '@/features/auth/use-session';

import { isFeatureEnabled } from '@/config/feature-flags';
import { ROUTES } from '@/shared/constants/shell-routes';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const drawerNavLinkClass = (isActive: boolean) =>
  cn(
    'flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium no-underline transition-colors',
    isActive
      ? 'bg-primary-500/15 text-primary-400'
      : 'text-neutral-300 hover:bg-white/6 hover:text-neutral-100',
  );

export const MobileDrawer = ({ isOpen, onClose }: Props) => {
  const { isAuthenticated } = useSession();
  const aiAssistant = isFeatureEnabled('enableAIAssistant');
  const panelRef = React.useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { t } = useTranslation('common');

  // Close on Escape
  React.useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  // Focus first nav item on open
  React.useEffect(() => {
    if (isOpen) {
      const first = panelRef.current?.querySelector<HTMLElement>('a, button');
      first?.focus();
    }
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden
        onClick={onClose}
        className={cn(
          'fixed inset-0 z-40 bg-black/50 transition-opacity duration-200 md:hidden',
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
      />

      {/* Drawer panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-label={t('mobileNav.brand', 'Navigation menu')}
        aria-modal="true"
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-neutral-900 shadow-xl transition-transform duration-200 ease-out md:hidden',
          isOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/6 px-4 py-3">
          <span className="text-sm font-bold tracking-[0.08em] text-neutral-50">
            NEXPLOR<span className="font-normal text-primary-500">ING</span>
          </span>
          <button
            type="button"
            aria-label={t('mobileNav.close', 'Close navigation menu')}
            onClick={onClose}
            className="flex size-8 items-center justify-center rounded-lg text-neutral-400 transition-colors hover:bg-white/8 hover:text-neutral-100"
          >
            <XIcon className="size-4" aria-hidden />
          </button>
        </div>

        {/* Nav items */}
        <nav aria-label="Drawer navigation" className="flex flex-col gap-1 p-3">
          <Link
            href={ROUTES.HOME}
            className={drawerNavLinkClass(pathname === ROUTES.HOME)}
            onClick={onClose}
          >
            <CompassIcon className="size-4 shrink-0" strokeWidth={2} aria-hidden />
            {t('nav.explore')}
          </Link>

          {isAuthenticated && (
            <Link
              href={ROUTES.ASSISTANT}
              className={drawerNavLinkClass(pathname.startsWith(ROUTES.ASSISTANT))}
              onClick={onClose}
            >
              <SparklesIcon className="size-4 shrink-0" strokeWidth={2} aria-hidden />
              {t('nav.planTrip')}
            </Link>
          )}

          {isAuthenticated && (
            <Link
              href={ROUTES.MY_TRIPS}
              className={cn(
                drawerNavLinkClass(pathname.startsWith(ROUTES.MY_TRIPS)),
                !aiAssistant && 'cursor-not-allowed opacity-40',
              )}
              onClick={aiAssistant ? onClose : (e) => e.preventDefault()}
              aria-disabled={!aiAssistant}
            >
              <MapIcon className="size-4 shrink-0" strokeWidth={2} aria-hidden />
              {t('nav.myTrips')}
              {!aiAssistant && (
                <span className="ml-auto rounded-full bg-neutral-300/10 px-1.5 py-px text-[9px] font-semibold uppercase tracking-widest text-neutral-500">
                  {t('nav.soon')}
                </span>
              )}
            </Link>
          )}
        </nav>
      </div>
    </>
  );
};
