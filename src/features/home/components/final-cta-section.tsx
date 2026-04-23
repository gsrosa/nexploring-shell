'use client';

import { Button } from '@gsrosa/atlas-ui';
import { ArrowRightIcon, SparklesIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { useTranslation } from 'react-i18next';

import { useAuthUiStore } from '@/features/auth/auth-ui-store';
import { useSession } from '@/features/auth/use-session';
import { ROUTES } from '@/shared/constants/shell-routes';

import { HOME_FINAL_CTA_BG } from '../data/home-hero';
import { FadeUp } from './fade-up';

export const FinalCtaSection = () => {
  const { t } = useTranslation('home');
  const router = useRouter();
  const openLogin = useAuthUiStore((s) => s.openLogin);
  const { isAuthenticated, isLoading } = useSession();

  const handleGoPlan = () => {
    if (isLoading) return;
    if (!isAuthenticated) {
      openLogin();
      return;
    }
    router.push(ROUTES.ASSISTANT);
  };

  return (
    <section
      aria-labelledby="final-cta-heading"
      className="relative flex min-h-[80vh] items-center justify-center overflow-hidden px-6 py-24 text-center md:px-12 lg:px-20"
    >
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgb(17 19 23 / 0.45) 0%, rgb(17 19 23 / 0.92) 100%), url('${HOME_FINAL_CTA_BG}')`,
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 30%, rgb(0 227 253 / 0.06), transparent)',
        }}
        aria-hidden
      />

      <div className="relative z-10 w-full max-w-[600px]">
        <FadeUp>
          <p className="mb-5 font-sans text-[10px] font-bold uppercase tracking-[0.35em] text-auxiliary-300">
            {t('finalCta.label')}
          </p>
          <h2
            id="final-cta-heading"
            className="mb-5 font-display text-[clamp(2rem,5vw,3.4rem)] font-bold italic leading-[1.08] tracking-tight text-neutral-100"
          >
            {t('finalCta.heading1')}
            <br />
            {t('finalCta.heading2')}{' '}
            <span className="bg-linear-to-r from-primary-300 to-primary-500 bg-clip-text font-display font-bold not-italic text-transparent">
              {t('finalCta.heading3')}
            </span>
            .
          </h2>
          <p className="mb-10 font-sans text-[clamp(15px,1.6vw,17px)] font-light leading-[1.75] text-neutral-300">
            {t('finalCta.body')}
          </p>

          <div className="mb-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              type="button"
              variant="primary"
              size="lg"
              className="group"
              onClick={handleGoPlan}
            >
              <SparklesIcon className="size-4" aria-hidden strokeWidth={2} />
              {t('finalCta.ctaStart')}
              <ArrowRightIcon
                className="size-4 transition-transform group-hover:translate-x-1"
                aria-hidden
                strokeWidth={2}
              />
            </Button>
            <Button variant="secondary" size="lg" asChild>
              <a href="#how-it-works">{t('finalCta.ctaHowItWorks')}</a>
            </Button>
          </div>

          <p className="font-sans text-xs tracking-wide text-neutral-500">
            {t('finalCta.disclaimer')}
          </p>
        </FadeUp>
      </div>
    </section>
  );
};
