'use client';

import { cn } from '@gsrosa/atlas-ui';
import { HeartIcon, UserIcon, UsersIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import {
  HOME_PRECISION_BULLETS,
  HOME_PRECISION_DAYS,
} from '../data/home-precision';
import { FadeUp } from './fade-up';

const MODES = [
  { icon: UserIcon, labelKey: 'precision.mode.solo' as const },
  { icon: HeartIcon, labelKey: 'precision.mode.couple' as const },
  { icon: UsersIcon, labelKey: 'precision.mode.family' as const },
];

export const PrecisionSection = () => {
  const { t } = useTranslation('home');
  return (
    <section
      aria-labelledby="precision-heading"
      className="overflow-hidden bg-neutral-900 px-6 py-24 md:px-12 md:py-32 lg:px-20"
    >
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <FadeUp>
          <div>
            <p className="mb-4 font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-auxiliary-300">
              {t('precision.label')}
            </p>
            <h2
              id="precision-heading"
              className="mb-5 font-display text-[clamp(1.6rem,3.5vw,2.8rem)] font-bold italic leading-[1.12] text-neutral-100"
            >
              {t('precision.heading1')}
              <br />
              <span className="bg-linear-to-r from-primary-200 to-primary-500 bg-clip-text font-display font-bold not-italic text-transparent">
                {t('precision.heading2')}
              </span>
            </h2>
            <p className="mb-10 max-w-[440px] font-sans text-[15px] font-light leading-[1.75] text-neutral-300">
              {t('precision.body')}
            </p>
            <div className="flex flex-col gap-7">
              {HOME_PRECISION_BULLETS.map((p, i) => (
                <div key={p.title} className="flex items-start gap-4">
                  <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full border border-neutral-600/50 bg-neutral-800">
                    <span className="text-xl font-bold text-auxiliary-400">
                      ◇
                    </span>
                  </div>
                  <div>
                    <div className="mb-1.5 font-sans text-[15px] font-bold text-neutral-100">
                      {t(`precision.bullet.${i + 1}.title`)}
                    </div>
                    <p className="font-sans text-[13px] font-light leading-[1.65] text-neutral-300">
                      {t(`precision.bullet.${i + 1}.body`)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeUp>

        <FadeUp delay={120}>
          <div className="relative">
            <div className="pointer-events-none absolute -inset-10 rounded-full bg-auxiliary-400/8 blur-[80px]" />
            <div className="relative flex flex-col gap-4 rounded-3xl border border-neutral-600/40 bg-neutral-800 p-6 shadow-[0_28px_90px_rgba(0,0,0,0.4)] backdrop-blur-sm">
              <div className="flex flex-wrap gap-2">
                {MODES.map((mode, i) => (
                  <div
                    key={mode.labelKey}
                    className={cn(
                      'flex cursor-default items-center gap-2 rounded-full px-3.5 py-2 font-sans text-xs font-bold',
                      i === 0
                        ? 'bg-primary-500 text-white shadow-md shadow-primary-500/25'
                        : 'border border-neutral-700/90 bg-neutral-800 text-neutral-300',
                    )}
                  >
                    <mode.icon
                      className="size-3.5"
                      aria-hidden
                      strokeWidth={2}
                    />
                    {t(mode.labelKey)}
                  </div>
                ))}
              </div>

              <div className="rounded-2xl border border-neutral-700/80 bg-neutral-900/90 p-5">
                <div className="mb-4 flex items-center justify-between">
                  <div className="font-sans text-[9px] font-bold uppercase tracking-[0.15em] text-auxiliary-300">
                    {t('precision.demo.location')}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="size-1.5 rounded-full bg-success-500 animate-hp-pulse-soft" />
                    <span className="font-sans text-[10px] font-bold text-neutral-400">
                      {t('precision.demo.live')}
                    </span>
                  </div>
                </div>
                {HOME_PRECISION_DAYS.map((item) => (
                  <div
                    key={item.day}
                    className="flex items-center gap-3 border-b border-neutral-700/60 py-2.5 last:border-b-0"
                  >
                    <span className="w-10 font-sans text-[10px] font-bold text-primary-300">
                      {item.day}
                    </span>
                    <span className="flex-1 font-sans text-[13px] text-neutral-100">
                      {item.title}
                    </span>
                    <span className="rounded-full bg-neutral-700/80 px-2 py-0.5 font-sans text-[9px] font-medium text-neutral-300">
                      {item.tag}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between px-1">
                <div>
                  <div className="mb-1 font-sans text-[9px] font-bold uppercase tracking-[0.15em] text-neutral-400">
                    {t('precision.demo.confidence')}
                  </div>
                  <div className="font-display text-lg font-bold text-neutral-100">
                    97%
                  </div>
                </div>
                <div className="h-8 w-px bg-neutral-700" />
                <div>
                  <div className="mb-1 font-sans text-[9px] font-bold uppercase tracking-[0.15em] text-neutral-400">
                    {t('precision.demo.budget')}
                  </div>
                  <div className="font-display text-lg font-bold text-neutral-100">
                    $2,100
                  </div>
                </div>
                <div className="h-8 w-px bg-neutral-700" />
                <div>
                  <div className="mb-1 font-sans text-[9px] font-bold uppercase tracking-[0.15em] text-neutral-400">
                    {t('precision.demo.activities')}
                  </div>
                  <div className="font-display text-lg font-bold text-neutral-100">
                    24
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
};
