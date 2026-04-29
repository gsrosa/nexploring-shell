'use client';

import React from 'react';

import { cn } from '@gsrosa/nexploring-ui';
import { useTranslation } from 'react-i18next';

const currentYear = new Date().getFullYear();

export const Footer = React.memo(() => {
  const { t } = useTranslation('common');

  const LINKS: { key: string; href: string; hiddenMobile?: boolean }[] = [
    { key: 'footer.privacy', href: '#privacy' },
    { key: 'footer.terms', href: '#terms' },
    { key: 'footer.docs', href: '#docs', hiddenMobile: true },
    { key: 'footer.support', href: '#support', hiddenMobile: true },
  ];

  return (
    <footer
      role="contentinfo"
      className="shrink-0 border-t border-white/[0.06] bg-neutral-900"
    >
      <div className="flex items-center justify-between flex-wrap gap-2 px-4 py-5 md:px-6 md:py-6 lg:px-10 lg:py-7">
        <div className="hidden md:flex items-center gap-3">
          <img
            src="/nexploring-logo.svg"
            alt=""
            width={120}
            height={32}
            className="h-8 w-auto max-w-[min(42vw,140px)] object-contain object-left md:h-9 md:max-w-none"
            decoding="async"
          />
          {/* suppressHydrationWarning: year is a module-level constant that may
              differ if the server module was cached across a year boundary. */}
          <span suppressHydrationWarning className="text-xs text-neutral-500 font-sans">
            © {currentYear} · {t('footer.tagline')}
          </span>
        </div>

        <span suppressHydrationWarning className="md:hidden text-[11px] text-neutral-500 font-sans">
          © {currentYear} Nexploring
        </span>

        <nav
          aria-label="Footer links"
          className="flex items-center gap-3 md:gap-4"
        >
          {LINKS.map((link) => (
            <a
              key={link.key}
              href={link.href}
              className={cn(
                'text-[10px] md:text-[11px] font-sans uppercase tracking-[0.15em] text-neutral-500 transition-colors hover:text-auxiliary-400',
                link.hiddenMobile && 'hidden md:inline',
              )}
            >
              {t(link.key)}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
});
