import { Bookmark, Home, Map, User } from 'lucide-react';
import type { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { isFeatureEnabled } from '@/config/feature-flags';
import { ROUTES } from '@/shared/constants/shell-routes';

interface BottomNavItem {
  to: string;
  label: string;
  icon: ReactNode;
  end?: boolean;
  disabled?: boolean;
}

const userApp = isFeatureEnabled('enableUserApp');

const iconClass = 'size-5';

const ITEMS: BottomNavItem[] = [
  { to: ROUTES.HOME, label: 'Home', icon: <Home className={iconClass} aria-hidden />, end: true },
  { to: ROUTES.ASSISTANT, label: 'Plan Trip', icon: <Map className={iconClass} aria-hidden /> },
  {
    to: ROUTES.USER,
    label: 'My Plans',
    icon: <Bookmark className={iconClass} aria-hidden />,
    disabled: !userApp,
  },
  {
    to: ROUTES.ACCOUNT,
    label: 'Profile',
    icon: <User className={iconClass} aria-hidden />,
    disabled: !userApp,
  },
];

export function BottomNav() {
  return (
    <nav
      aria-label="Mobile navigation"
      className="bottom-nav fixed bottom-0 left-0 right-0 z-20 flex bg-neutral-100 border-t border-neutral-200 shadow-[0_-8px_28px_rgba(0,0,0,0.45)] md:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
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
              `flex flex-col items-center gap-[3px] flex-1 pt-2.5 pb-2 text-[10px] no-underline ${
                isActive
                  ? 'bottom-nav-active font-bold text-primary-400'
                  : 'font-medium text-neutral-400'
              }`
            }
          >
            {item.icon}
            <span className="leading-none">{item.label}</span>
          </NavLink>
        ),
      )}
    </nav>
  );
}
