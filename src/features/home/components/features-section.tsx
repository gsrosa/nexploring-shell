'use client';

import { cn } from '@gsrosa/atlas-ui';
import { useTranslation } from 'react-i18next';

import { HOME_FEATURE_BLOCKS } from '../data/home-features';
import { FadeUp } from './fade-up';

export const FeaturesSection = () => {
  const { t } = useTranslation('home');
  return (
    <section
      aria-labelledby="features-heading"
      className="bg-neutral-900 px-6 py-24 md:px-12 md:py-32 lg:px-20"
    >
      <div className="mx-auto max-w-[1200px]">
        <FadeUp>
          <div className="mb-16 flex flex-wrap items-end justify-between gap-6 md:mb-20">
            <div className="max-w-[560px]">
              <p className="mb-4 font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-auxiliary-400">
                {t('features.label')}
              </p>
              <h2
                id="features-heading"
                className="mb-4 font-display text-[clamp(1.6rem,3.5vw,2.8rem)] font-bold italic leading-[1.12] text-neutral-100"
              >
                {t('features.heading1')}
                <br />
                <span className="bg-linear-to-r from-primary-200 to-primary-500 bg-clip-text font-display font-bold not-italic text-transparent">
                  {t('features.heading2')}
                </span>
              </h2>
              <p className="font-sans text-[15px] font-light leading-[1.75] text-neutral-300">
                {t('features.body')}
              </p>
            </div>
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {HOME_FEATURE_BLOCKS.map((f, i) => (
            <FadeUp key={`feature-${i + 1}`} delay={i * 80}>
              <div
                className={cn(
                  'group relative h-full overflow-hidden rounded-2xl border border-neutral-700/80 bg-neutral-800 p-8 transition-all duration-300 md:p-10',
                  'hover:border-neutral-700 hover:bg-neutral-700 hover:shadow-[0_24px_70px_rgba(0,0,0,0.35)]',
                )}
              >
                <div
                  className={cn(
                    'mb-6 flex size-12 items-center justify-center rounded-full transition-colors',
                    f.accent === 'primary'
                      ? 'bg-primary-500/15 group-hover:bg-primary-500/18'
                      : 'bg-auxiliary-500/15 group-hover:bg-auxiliary-500/18',
                  )}
                >
                  <f.icon
                    className={cn(
                      'size-5',
                      f.accent === 'primary'
                        ? 'text-primary-400'
                        : 'text-auxiliary-300',
                    )}
                    aria-hidden
                    strokeWidth={2}
                  />
                </div>
                <h3 className="mb-3 font-display text-lg font-semibold leading-tight text-neutral-100">
                  {t(`feature.${i + 1}.title`)}
                </h3>
                <p className="font-sans text-[14px] font-light leading-[1.7] text-neutral-300">
                  {t(`feature.${i + 1}.body`)}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
};
