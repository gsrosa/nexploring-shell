'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@gsrosa/nexploring-ui';
import { BookmarkIcon, HomeIcon, MapIcon, UserIcon } from 'lucide-react';
import type React from 'react';
import { useTranslation } from 'react-i18next';

import { isFeatureEnabled } from '@/config/feature-flags';
import { ROUTES } from '@/shared/constants/shell-routes';

type BottomNavItem = {
  to: string;
  labelKey: string;
  icon: React.ReactNode;
  end?: boolean;
  disabled?: boolean;
};

const userApp = isFeatureEnabled('enableUserApp');
const aiAssistant = isFeatureEnabled('enableAIAssistant');

const iconClass = 'size-5';

const ITEMS: BottomNavItem[] = [
  {
    to: ROUTES.HOME,
    labelKey: 'nav.home',
    icon: <HomeIcon className={iconClass} aria-hidden />,
    end: true,
  },
  {
    to: ROUTES.ASSISTANT,
    labelKey: 'nav.planTrip',
    icon: <MapIcon className={iconClass} aria-hidden />,
  },
  {
    to: ROUTES.MY_TRIPS,
    labelKey: 'nav.myTrips',
    icon: <BookmarkIcon className={iconClass} aria-hidden />,
    disabled: !aiAssistant,
  },
  {
    to: ROUTES.PROFILE,
    labelKey: 'nav.profile',
    icon: <UserIcon className={iconClass} aria-hidden />,
    disabled: !userApp,
  },
];

export const BottomNav = () => {
  const pathname = usePathname();
  const { t } = useTranslation('common');

  return (
    <nav
      aria-label={t('mobileNav.label', 'Mobile navigation')}
      className="bottom-nav fixed bottom-0 left-0 right-0 z-20 flex bg-neutral-800 border-t border-neutral-900 shadow-[0_-8px_28px_rgba(0,0,0,0.45)] pb-[env(safe-area-inset-bottom,0px)] md:hidden"
    >
      {ITEMS.map((item) => {
        const label = t(item.labelKey);
        if (item.disabled) {
          return (
            <span
              key={`${item.labelKey}-${item.to}`}
              aria-disabled="true"
              className="flex flex-col items-center gap-[3px] flex-1 pt-2.5 pb-2 text-[10px] font-medium text-neutral-400 opacity-40 cursor-not-allowed select-none"
            >
              {item.icon}
              <span className="leading-none">{label}</span>
            </span>
          );
        }

        const isActive = item.end
          ? pathname === item.to
          : pathname.startsWith(item.to);

        return (
          <Link
            key={`${item.labelKey}-${item.to}`}
            href={item.to}
            className={cn(
              'flex flex-col items-center gap-[3px] flex-1 pt-2.5 pb-2 text-[10px] no-underline',
              isActive
                ? 'bottom-nav-active font-bold text-primary-400'
                : 'font-medium text-neutral-300',
            )}
          >
            {item.icon}
            <span className="leading-none">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
};
