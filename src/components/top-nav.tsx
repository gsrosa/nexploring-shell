import { NavLink } from 'react-router-dom';
import { ROUTES } from '@/shared/constants/shell-routes';

function IconPlane() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21 4 19 2c-2-2-4-1-5.5.5L10 6 1.8 4.2a.5.5 0 0 0-.4.7L4 10l6-1 1.5 5.5L8 16l1 4 3.8-3.8 4.8 2.2a.5.5 0 0 0 .7-.4z" />
    </svg>
  );
}

function IconSettings() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}

interface NavItem {
  to: string;
  label: string;
  end?: boolean;
  disabled?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { to: ROUTES.HOME, label: 'Home', end: true },
  { to: ROUTES.ASSISTANT, label: 'Plan Trip' },
  { to: '/plans', label: 'My Plans', disabled: true },
];

export function TopNav() {
  return (
    <header
      role="banner"
      className="sticky top-0 z-30 flex-shrink-0 min-h-[52px] md:min-h-[60px] lg:min-h-[64px] bg-[#111317]/75 backdrop-blur-xl backdrop-saturate-150 border-b border-white/[0.06] shadow-[0_8px_32px_rgba(0,0,0,0.35)]"
    >
      <div className="flex items-center min-h-[52px] md:min-h-[60px] lg:min-h-[64px] min-w-0 gap-2 sm:gap-3 px-3 sm:px-4 md:px-6 lg:px-10 py-1.5 md:py-0">
        <NavLink
          to="/"
          aria-label="Atlas home"
          className="font-black text-[1.05rem] sm:text-[1.125rem] md:text-[1.25rem] lg:text-[1.375rem] tracking-tight text-primary-400 no-underline shrink-0 max-w-[42vw] sm:max-w-none truncate md:mr-4 lg:mr-8"
        >
          Atlas <span className="text-auxiliary-400">AI</span>
        </NavLink>

        <nav
          aria-label="Main navigation"
          className="hidden md:flex items-center justify-center gap-0.5 lg:gap-1 flex-1 min-w-0 mx-1 lg:mx-2 overflow-x-auto no-scrollbar py-0.5"
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

        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 ml-auto">
          <button
            type="button"
            aria-label="Plan a new trip"
            className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1.5 lg:px-4 lg:py-2 rounded-lg bg-auxiliary-500 lg:bg-auxiliary-600 text-white text-[12px] lg:text-sm font-bold whitespace-nowrap transition-colors hover:bg-auxiliary-600 cursor-pointer"
          >
            <IconPlane />
            <span className="lg:hidden">Plan Trip</span>
            <span className="hidden lg:inline">Plan New Trip</span>
          </button>

          <button
            type="button"
            aria-label="Open user menu"
            className="hidden lg:inline-flex items-center gap-2 pl-1.5 pr-2.5 py-1.5 rounded-[10px] bg-neutral-50 border border-neutral-200 cursor-pointer transition-colors hover:bg-primary-50/80 hover:border-primary-200 max-w-[min(200px,28vw)]"
          >
            <div className="flex items-center justify-center w-7 h-7 rounded-full bg-primary-50 border-2 border-primary-200 text-[11px] font-bold text-primary-400 shrink-0">
              G
            </div>
            <div className="flex flex-col text-left min-w-0 overflow-hidden">
              <span className="text-[12px] font-bold text-neutral-700 leading-tight truncate">
                Guilherme
              </span>
              <span className="text-[10px] text-neutral-500 leading-tight truncate">
                2 active plans
              </span>
            </div>
            <span className="text-neutral-500 shrink-0">
              <IconSettings />
            </span>
          </button>

          <button
            type="button"
            aria-label="Open user menu"
            className="lg:hidden flex items-center justify-center w-[34px] h-[34px] rounded-full bg-primary-50 border-2 border-primary-200 text-[13px] font-bold text-primary-400 transition-colors hover:bg-primary-100 cursor-pointer shrink-0"
          >
            G
          </button>
        </div>
      </div>
    </header>
  );
}
