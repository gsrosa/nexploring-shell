import React from 'react';

import { cn } from '@gsrosa/atlas-ui';
import { BookmarkIcon, HomeIcon, MapIcon, UserIcon } from 'lucide-react';
import { NavLink } from 'react-router-dom';

import { isFeatureEnabled } from '@/config/feature-flags';
import { ROUTES } from '@/shared/constants/shell-routes';

type BottomNavItem = {
  to: string;
  label: string;
  icon: React.ReactNode;
  end?: boolean;
  disabled?: boolean;
};

const userApp = isFeatureEnabled('enableUserApp');

const iconClass = 'size-5';

const ITEMS: BottomNavItem[] = [
  {
    to: ROUTES.HOME,
    label: 'Home',
    icon: <HomeIcon className={iconClass} aria-hidden />,
    end: true,
  },
  {
    to: ROUTES.ASSISTANT,
    label: 'Plan Trip',
    icon: <MapIcon className={iconClass} aria-hidden />,
  },
  {
    to: ROUTES.MY_TRIPS,
    label: 'My Trips',
    icon: <BookmarkIcon className={iconClass} aria-hidden />,
    disabled: !userApp,
  },
  {
    to: ROUTES.PROFILE,
    label: 'Profile',
    icon: <UserIcon className={iconClass} aria-hidden />,
    disabled: !userApp,
  },
];

export const BottomNav = () => {
  return (
    <nav
      aria-label="Mobile navigation"
      className="bottom-nav fixed bottom-0 left-0 right-0 z-20 flex bg-neutral-100 border-t border-neutral-200 shadow-[0_-8px_28px_rgba(0,0,0,0.45)] pb-[env(safe-area-inset-bottom,0px)] md:hidden"
    >
      {ITEMS.map((item) =>
        item.disabled ? (
          <span
            key={`${item.label}-${item.to}`}
            aria-disabled="true"
            className="flex flex-col items-center gap-[3px] flex-1 pt-2.5 pb-2 text-[10px] font-medium text-neutral-400 opacity-40 cursor-not-allowed select-none"
          >
            {item.icon}
            <span className="leading-none">{item.label}</span>
          </span>
        ) : (
          <NavLink
            key={`${item.label}-${item.to}`}
            to={item.to}
            end={item.end ?? false}
            className={({ isActive }) =>
              cn(
                'flex flex-col items-center gap-[3px] flex-1 pt-2.5 pb-2 text-[10px] no-underline',
                isActive
                  ? 'bottom-nav-active font-bold text-primary-400'
                  : 'font-medium text-neutral-400',
              )
            }
          >
            {item.icon}
            <span className="leading-none">{item.label}</span>
          </NavLink>
        ),
      )}
    </nav>
  );
};
