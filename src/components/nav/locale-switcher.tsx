'use client';

import { cn } from '@gsrosa/nexploring-ui';
import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import { useSession } from '@/features/auth/use-session';

import type { SupportedLocale } from '@/lib/i18n';
import { persistLocale, SUPPORTED } from '@/lib/i18n';
import { useTrpc } from '@/trpc/client';

const LOCALES: { value: SupportedLocale; label: string }[] = [
  { value: 'en-US', label: 'EN' },
  { value: 'pt-BR', label: 'PT' },
  { value: 'es-ES', label: 'ES' },
];

export const LocaleSwitcher = () => {
  const { i18n } = useTranslation();
  const { isAuthenticated } = useSession();
  const trpc = useTrpc();
  const updateMe = useMutation(trpc.users.updateMe.mutationOptions());

  const current = (SUPPORTED as readonly string[]).includes(i18n.language)
    ? (i18n.language as SupportedLocale)
    : 'en-US';

  const handleChange = (locale: SupportedLocale) => {
    if (locale === current) return;

    void i18n.changeLanguage(locale);

    persistLocale(locale);

    window.dispatchEvent(
      new CustomEvent('nexploring:locale-changed', { detail: { locale } }),
    );

    if (isAuthenticated) {
      updateMe.mutate({ preferred_locale: locale });
    }
  };

  return (
    <div
      className="flex shrink-0 items-center gap-0.5 rounded-full border border-white/10 p-0.5"
      role="group"
      aria-label="Language"
    >
      {LOCALES.map(({ value, label }) => (
        <button
          key={value}
          type="button"
          suppressHydrationWarning
          aria-pressed={current === value}
          aria-label={`Switch to ${label}`}
          onClick={() => handleChange(value)}
          className={cn(
            'rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider transition-colors',
            current === value
              ? 'bg-primary-500 text-white'
              : 'text-neutral-400 hover:text-neutral-100',
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );
};
