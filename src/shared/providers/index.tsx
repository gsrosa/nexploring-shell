'use client';

import { type ReactNode, useEffect } from 'react';

import { NexploringProvider } from '@gsrosa/nexploring-ui';

import { AuthShellEffects } from '@/features/auth/auth-shell-effects';
import { LoginModal } from '@/features/auth/login-modal';
import { SignUpModal } from '@/features/auth/signup-modal';
import { useSession } from '@/features/auth/use-session';

import i18n, {
  getPersistedLocale,
  persistLocale,
  SUPPORTED,
  type SupportedLocale,
} from '@/lib/i18n';

import { ErrorBoundary } from './error-boundary';
import { QueryProvider } from './query-provider';

import '@/lib/i18n';

function LocaleSync() {
  useEffect(() => {
    const locale = getPersistedLocale();
    if (locale !== i18n.language) {
      void i18n.changeLanguage(locale);
      window.dispatchEvent(
        new CustomEvent('nexploring:locale-changed', { detail: { locale } }),
      );
    }
  }, []);

  return null;
}

function LocaleProfileSync() {
  const { profile } = useSession();

  useEffect(() => {
    const locale = profile?.preferred_locale;
    if (
      locale &&
      (SUPPORTED as readonly string[]).includes(locale) &&
      locale !== i18n.language
    ) {
      const typed = locale as SupportedLocale;
      void i18n.changeLanguage(typed);
      persistLocale(typed);
      window.dispatchEvent(
        new CustomEvent('nexploring:locale-changed', { detail: { locale: typed } }),
      );
    }
  }, [profile?.preferred_locale]);

  return null;
}

export const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <NexploringProvider>
      <ErrorBoundary>
        <QueryProvider>
          <LocaleSync />
          <LocaleProfileSync />
          <AuthShellEffects />
          <LoginModal />
          <SignUpModal />
          {children}
        </QueryProvider>
      </ErrorBoundary>
    </NexploringProvider>
  );
};
