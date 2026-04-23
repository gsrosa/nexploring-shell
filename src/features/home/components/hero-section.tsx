'use client';

import { Button } from '@gsrosa/atlas-ui';
import {
  ArrowRightIcon,
  ChevronDownIcon,
  MessageSquareIcon,
  SparklesIcon,
  ZapIcon,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useTranslation } from 'react-i18next';

import { useAuthUiStore } from '@/features/auth/auth-ui-store';
import { useSession } from '@/features/auth/use-session';
import { ROUTES } from '@/shared/constants/shell-routes';

import { HOME_HERO_BG } from '../data/home-hero';
import { FadeUp } from './fade-up';
import { GridBackground } from './grid-background';
import { HomeChatDemo } from './home-chat-demo';

export const HeroSection = () => {
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
      aria-labelledby="hero-heading"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-neutral-900"
    >
      <div
        className="absolute inset-0 z-0 scale-[1.02] bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgb(17 19 23 / 0.15) 0%, rgb(17 19 23 / 0.4) 30%, rgb(17 19 23 / 0.85) 60%, rgb(17 19 23) 100%), url('${HOME_HERO_BG}')`,
        }}
        aria-hidden
      />
      <GridBackground />

      <div className="relative z-10 mx-auto flex w-full max-w-[1200px] flex-wrap items-center gap-12 px-6 pb-16 pt-28 md:gap-16 md:px-12 md:pt-32 lg:px-20">
        <div className="min-w-[min(100%,320px)] flex-1">
          <FadeUp>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary-400 bg-primary-200/10 px-3.5 py-1.5 font-sans text-[10px] uppercase tracking-[0.3em] text-primary-300 font-bold">
              <ZapIcon className="size-3" aria-hidden strokeWidth={2.5} />
              {t('hero.badge')}
            </div>
          </FadeUp>

          <FadeUp delay={80}>
            <h1
              id="hero-heading"
              className="mb-6 font-display text-[clamp(2.2rem,5vw,3.8rem)] font-bold italic leading-[1.06] tracking-tight text-neutral-200"
            >
              Your trips, planned by{' '}
              <span className="bg-linear-to-r from-primary-200 to-primary-500 bg-clip-text font-display font-bold not-italic text-transparent">
                artificial intelligence
              </span>{' '}
              that understands you.
            </h1>
          </FadeUp>

          <FadeUp delay={160}>
            <p className="mb-8 max-w-[480px] font-sans text-[clamp(15px,1.5vw,17px)] font-light leading-[1.75] text-neutral-300">
              {t('hero.body')}
            </p>
          </FadeUp>

          <FadeUp delay={240}>
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <Button
                type="button"
                variant="primary"
                size="lg"
                className="group"
                onClick={handleGoPlan}
              >
                <SparklesIcon className="size-4" aria-hidden strokeWidth={2} />
                {t('hero.ctaStart')}
                <ArrowRightIcon
                  className="size-4 transition-transform group-hover:translate-x-1"
                  aria-hidden
                  strokeWidth={2}
                />
              </Button>
              <Button
                variant="secondary"
                size="lg"
                asChild
                className="group px-6 py-3"
              >
                <a href="#how-it-works">
                  <MessageSquareIcon
                    className="size-4"
                    aria-hidden
                    strokeWidth={2}
                  />
                  {t('hero.ctaHowItWorks')}
                </a>
              </Button>
            </div>
          </FadeUp>

          <FadeUp delay={320}>
            <div className="flex flex-wrap items-center gap-6 font-sans text-[11px] text-neutral-400">
              <span className="flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-success-500" />{' '}
                {t('hero.stat.travelers')}
              </span>
              <span>{t('hero.stat.countries')}</span>
              <span>{t('hero.stat.beta')}</span>
            </div>
          </FadeUp>
        </div>

        <FadeUp
          delay={300}
          className="w-full shrink-0 md:w-[clamp(280px,35vw,420px)]"
        >
          <HomeChatDemo onViewFullItinerary={handleGoPlan} />
        </FadeUp>
      </div>

      <div className="pointer-events-none absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1.5 opacity-35">
        <span className="font-sans text-[9px] uppercase tracking-[0.25em] text-neutral-200">
          {t('hero.scroll')}
        </span>
        <ChevronDownIcon
          className="size-4 text-neutral-200 animate-hp-bob"
          aria-hidden
          strokeWidth={2}
        />
      </div>

      <Link href={ROUTES.ASSISTANT} className="sr-only">
        {t('hero.skipLink')}
      </Link>
    </section>
  );
};
