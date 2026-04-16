import React from 'react';

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  cn,
} from '@gsrosa/atlas-ui';
import {
  CompassIcon,
  CreditCardIcon,
  LogOutIcon,
  MapIcon,
  SlidersIcon,
  SparklesIcon,
  UserIcon,
} from 'lucide-react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

import { isFeatureEnabled } from '@/config/feature-flags';
import { useAuthUiStore } from '@/features/auth/auth-ui-store';
import { profileDisplayName } from '@/features/auth/profile-display-name';
import { useSession } from '@/features/auth/use-session';
import { ROUTES } from '@/shared/constants/shell-routes';
import { trpc } from '@/lib/trpc';
import { CreditChip } from './credit-chip';

type NavItem = {
  to: string;
  label: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  end?: boolean;
  disabled?: boolean;
  requiresAuth?: boolean;
};

const buildNavItems = (): NavItem[] => {
  const userApp = isFeatureEnabled('enableUserApp');
  return [
    { to: ROUTES.HOME, label: 'Explore', icon: CompassIcon, end: true },
    {
      to: ROUTES.ASSISTANT,
      label: 'Plan Trip',
      icon: SparklesIcon,
      requiresAuth: true,
    },
    {
      to: ROUTES.MY_TRIPS,
      label: 'My Trips',
      icon: MapIcon,
      requiresAuth: true,
      disabled: !userApp,
    },
  ];
};

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    'inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium no-underline whitespace-nowrap transition-all',
    isActive
      ? 'bg-primary-500 text-white'
      : 'text-neutral-200 hover:text-neutral-100 hover:bg-white/6',
  );

const TopNavBrand = React.memo(() => {
  return (
    <Link
      to="/"
      aria-label="Atlas home"
      className="flex shrink-0 items-center gap-2 no-underline"
    >
      <div className="flex size-12 shrink-0 items-center justify-center">
        <img src="/atlas-logo.svg" alt="Atlas" className="min-size-12" />
      </div>
      <span className="hidden text-sm font-bold tracking-[0.08em] text-neutral-50 sm:inline">
        ATLAS <span className="font-normal text-primary-500">AI</span>
      </span>
    </Link>
  );
});

const TopNavNav = () => {
  const NAV_ITEMS = buildNavItems();
  const { isAuthenticated, isLoading } = useSession();
  const openLogin = useAuthUiStore((s) => s.openLogin);

  return (
    <nav aria-label="Main navigation" className="flex items-center gap-1">
      {NAV_ITEMS.map((item) => {
        const Icon = item.icon;

        if (item.disabled) {
          return (
            <span
              key={item.to}
              aria-disabled="true"
              className="inline-flex shrink-0 cursor-not-allowed select-none items-center gap-2 rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap text-neutral-400 opacity-40"
            >
              <Icon className="size-4" strokeWidth={2} />
              <span className="hidden sm:inline">{item.label}</span>
              <span className="hidden items-center rounded-full bg-neutral-300/10 px-1.5 py-px text-[9px] font-semibold uppercase tracking-widest text-neutral-600 sm:inline-flex">
                Soon
              </span>
            </span>
          );
        }

        if (item.requiresAuth) {
          if (isLoading) {
            return (
              <span
                key={item.to}
                className="inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap text-neutral-400 opacity-50"
              >
                <Icon className="size-4" strokeWidth={2} />
                <span className="hidden sm:inline">{item.label}</span>
              </span>
            );
          }
          if (!isAuthenticated) {
            return (
              <button
                key={item.to}
                type="button"
                onClick={openLogin}
                className="inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-full border-none bg-transparent px-4 py-2 text-sm font-medium whitespace-nowrap text-neutral-400 transition-all hover:bg-white/6 hover:text-neutral-600"
              >
                <Icon className="size-4" strokeWidth={2} />
                <span className="hidden sm:inline">{item.label}</span>
              </button>
            );
          }
        }

        return (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end ?? false}
            className={navLinkClass}
          >
            <Icon className="size-4" strokeWidth={2} />
            <span className="hidden sm:inline">{item.label}</span>
          </NavLink>
        );
      })}
    </nav>
  );
};

const TopNavAuth = () => {
  const userApp = isFeatureEnabled('enableUserApp');
  const { isAuthenticated, isLoading, profile } = useSession();
  const openLogin = useAuthUiStore((s) => s.openLogin);
  const navigate = useNavigate();
  const utils = trpc.useUtils();

  const signOut = trpc.auth.signOut.useMutation({
    onSuccess: async () => {
      await Promise.all([
        utils.users.me.invalidate(),
        utils.travelerProfile.get.invalidate(),
      ]);
    },
  });

  if (isLoading) {
    return (
      <span className="size-8 shrink-0 animate-pulse rounded-full bg-white/10" />
    );
  }

  if (isAuthenticated) {
    const initial = profileDisplayName(profile).slice(0, 1).toUpperCase();
    return (
      <div className="flex shrink-0 items-center gap-2">
        <CreditChip />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              aria-label="Open account menu"
              className="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full border border-primary-500/40 bg-primary-500/15 text-[12px] font-bold text-primary-400 transition-colors hover:border-primary-500/60 hover:bg-primary-500/25"
            >
              {initial}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            {userApp && (
              <DropdownMenuItem onClick={() => navigate(ROUTES.PROFILE_ABOUT)}>
                <UserIcon strokeWidth={2} />
                Profile
              </DropdownMenuItem>
            )}
            <DropdownMenuItem onClick={() => navigate(ROUTES.PROFILE_BILLING)}>
              <CreditCardIcon strokeWidth={2} />
              Billing
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate(ROUTES.PROFILE_PREFERENCES)}>
              <SlidersIcon strokeWidth={2} />
              Preferences
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              disabled={signOut.isPending}
              onClick={() => signOut.mutate()}
            >
              <LogOutIcon strokeWidth={2} />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }

  return (
    <div className="flex shrink-0 items-center gap-1.5">
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={openLogin}
        className="shrink-0"
      >
        Sign in
      </Button>
      <Button
        type="button"
        variant="primary"
        size="sm"
        onClick={openLogin}
        className="shrink-0"
      >
        Sign up
      </Button>
    </div>
  );
};

export const TopNav = React.memo(() => {
  return (
    <header
      role="banner"
      className="sticky top-0 z-30 shrink-0 border-b border-white/6 bg-neutral-900 backdrop-blur-xl"
    >
      <div className="flex min-h-[52px] w-full items-center justify-between gap-4 px-4 md:min-h-[60px] md:px-6 lg:min-h-16 lg:px-10">
        <TopNavBrand />
        <div className="flex items-center gap-2">
          <TopNavNav />
          <TopNavAuth />
        </div>
      </div>
    </header>
  );
});
