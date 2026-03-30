import { Settings } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { isFeatureEnabled } from '@/config/feature-flags';
import { ROUTES } from '@/shared/constants/shell-routes';

interface NavItem {
  to: string;
  label: string;
  end?: boolean;
  disabled?: boolean;
}

function buildNavItems(): NavItem[] {
  const userApp = isFeatureEnabled('enableUserApp');
  return [
    { to: ROUTES.HOME, label: 'Home', end: true },
    { to: ROUTES.ASSISTANT, label: 'Plan Trip' },
    {
      to: ROUTES.USER,
      label: 'My Plans',
      disabled: !userApp,
    },
  ];
}

export function TopNav() {
  const NAV_ITEMS = buildNavItems();
  const userApp = isFeatureEnabled('enableUserApp');

  return (
    <header
      role="banner"
      className="sticky top-0 z-30 shrink-0 min-h-[52px] md:min-h-[60px] lg:min-h-[64px] bg-[#111317]/75 backdrop-blur-xl backdrop-saturate-150 border-b border-white/6 shadow-[0_8px_32px_rgba(0,0,0,0.35)]"
    >
      <div className="flex w-full min-w-0 items-center gap-3 px-3 sm:px-4 md:px-6 lg:px-10 py-1.5 md:py-0 min-h-[52px] md:min-h-[60px] lg:min-h-[64px]">
        <NavLink
          to="/"
          aria-label="Atlas home"
          className="flex shrink-0 items-center no-underline"
        >
          <img
            src="/atlas-logo.svg"
            alt=""
            width={120}
            height={32}
            className="h-8 w-auto max-w-[min(42vw,140px)] object-contain object-left md:h-16 md:max-w-none"
            decoding="async"
          />
        </NavLink>

        <div className="flex min-w-0 flex-1 items-center justify-end gap-2 sm:gap-3">
          <nav
            aria-label="Main navigation"
            className="hidden md:flex items-center justify-end gap-0.5 lg:gap-1 overflow-x-auto no-scrollbar py-0.5"
          >
            {NAV_ITEMS.map((item) =>
              item.disabled ? (
                <span
                  key={item.to}
                  aria-disabled="true"
                  className="inline-flex items-center gap-1.5 shrink-0 px-2 lg:px-3 py-1.5 rounded-lg text-xs lg:text-sm font-medium text-neutral-600 opacity-50 cursor-not-allowed select-none whitespace-nowrap"
                >
                  {item.label}
                  <span className="inline-flex items-center px-1.5 py-px rounded-full bg-neutral-200 text-[10px] font-semibold tracking-widest uppercase text-neutral-500">
                    Soon
                  </span>
                </span>
              ) : (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end ?? false}
                  className={({ isActive }) =>
                    `inline-flex items-center gap-1.5 shrink-0 px-2 lg:px-3 py-1.5 rounded-lg text-xs lg:text-sm no-underline transition-colors whitespace-nowrap
                  ${
                    isActive
                      ? 'bg-primary-50 text-primary-400 font-semibold'
                      : 'font-medium text-neutral-600 hover:bg-neutral-200 hover:text-neutral-700'
                  }`
                  }
                >
                  {item.label}
                </NavLink>
              ),
            )}
          </nav>

          {userApp ? (
            <NavLink
              to={ROUTES.USER}
              aria-label="Open account"
              className="flex shrink-0 items-center justify-center no-underline lg:max-w-[min(200px,28vw)] lg:items-stretch lg:justify-start lg:gap-2 lg:rounded-[10px] lg:border lg:border-neutral-200 lg:bg-neutral-50 lg:px-2.5 lg:py-1.5 lg:transition-colors lg:hover:border-primary-200 lg:hover:bg-primary-50/80 [&_svg]:shrink-0"
            >
              <span className="flex size-[34px] items-center justify-center rounded-full border-2 border-primary-200 bg-primary-50 text-[13px] font-bold text-primary-400 lg:hidden">
                G
              </span>
              <span className="hidden min-w-0 flex-1 items-center gap-2 lg:flex">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full border-2 border-primary-200 bg-primary-50 text-[11px] font-bold text-primary-400">
                  G
                </span>
                <span className="flex min-w-0 flex-col overflow-hidden text-left">
                  <span className="truncate text-[12px] font-bold leading-tight text-neutral-700">
                    Account
                  </span>
                  <span className="truncate text-[10px] leading-tight text-neutral-500">
                    Plans & profile
                  </span>
                </span>
                <Settings
                  aria-hidden
                  className="size-[18px] text-neutral-500"
                  strokeWidth={2}
                />
              </span>
            </NavLink>
          ) : null}
        </div>
      </div>
    </header>
  );
}
