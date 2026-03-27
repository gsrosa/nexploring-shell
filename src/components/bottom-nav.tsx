import type { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '@/shared/constants/shell-routes';

function IconHome() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function IconMap() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
      <line x1="9" y1="3" x2="9" y2="18" />
      <line x1="15" y1="6" x2="15" y2="21" />
    </svg>
  );
}

function IconBookmark() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function IconUser() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

interface BottomNavItem {
  to: string;
  label: string;
  icon: ReactNode;
  end?: boolean;
  disabled?: boolean;
}

const ITEMS: BottomNavItem[] = [
  { to: ROUTES.HOME, label: 'Home', icon: <IconHome />, end: true },
  { to: ROUTES.ASSISTANT, label: 'Plan Trip', icon: <IconMap /> },
  { to: '/plans', label: 'My Plans', icon: <IconBookmark />, disabled: true },
  { to: '/profile', label: 'Profile', icon: <IconUser />, disabled: true },
];

export function BottomNav() {
  return (
    <nav
      aria-label="Mobile navigation"
      className="bottom-nav fixed bottom-0 left-0 right-0 z-20 flex bg-neutral-100 border-t border-neutral-200 shadow-[0_-8px_28px_rgba(0,0,0,0.45)] md:hidden!"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      {ITEMS.map((item) =>
        item.disabled ? (
          <span
            key={item.to}
            aria-disabled="true"
            className="flex flex-col items-center gap-[3px] flex-1 pt-2.5 pb-2 text-[10px] font-medium text-neutral-400 opacity-40 cursor-not-allowed select-none"
          >
            {item.icon}
            <span className="leading-none">{item.label}</span>
          </span>
        ) : (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end ?? false}
            className={({ isActive }) =>
              `flex flex-col items-center gap-[3px] flex-1 pt-2.5 pb-2 text-[10px] no-underline transition-colors
              ${
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
