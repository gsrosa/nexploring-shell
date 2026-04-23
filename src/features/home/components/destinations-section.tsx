'use client';

import React, { type MouseEvent } from 'react';

import { cn } from '@gsrosa/atlas-ui';
import { useRouter } from 'next/navigation';

import { useTranslation } from 'react-i18next';

import { useAuthUiStore } from '@/features/auth/auth-ui-store';
import { useSession } from '@/features/auth/use-session';
import { ROUTES } from '@/shared/constants/shell-routes';

import type { HomeCarouselDestination } from '../data/home-destinations-carousel';
import { HOME_DESTINATIONS_CAROUSEL } from '../data/home-destinations-carousel';
import { FadeUp } from './fade-up';

type DestinationCardProps = {
  d: HomeCarouselDestination;
  onPlan: (destination: string) => void;
};

const DestinationCard = ({ d, onPlan }: DestinationCardProps) => {
  const { t } = useTranslation('home');
  return (
    <button
      type="button"
      onClick={() => onPlan(d.name)}
      className="group relative aspect-3/4 w-[clamp(220px,24vw,276px)] shrink-0 cursor-pointer overflow-hidden rounded-2xl border border-neutral-700/80 text-left transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_28px_70px_rgba(17,19,23,0.18)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-500 focus-visible:ring-offset-0"
    >
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-[1.07]"
        style={{ backgroundImage: `url('${d.img}')` }}
        aria-hidden
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, transparent 22%, rgb(17 19 23 / 0.5) 56%, rgb(17 19 23 / 0.97) 100%)',
        }}
        aria-hidden
      />
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="mb-2 flex flex-wrap gap-1.5">
          {d.tags.map((t) => (
            <span
              key={t}
              className="rounded-full px-1.5 py-0.5 font-sans text-[9px] font-bold uppercase tracking-wide text-neutral-200 bg-neutral-600/40"
            >
              {t}
            </span>
          ))}
        </div>
        <div className="mb-1 font-display text-lg font-bold leading-tight text-neutral-50">
          {d.name}
        </div>
        <div className="mb-2 font-sans text-[10px] uppercase tracking-widest text-neutral-300">
          {d.country}
        </div>
        <div className="mb-3 font-display text-xs italic leading-relaxed text-neutral-300/90 text-nowrap line-clamp-1">
          &ldquo;{d.hook}&rdquo;
        </div>
        <div className="translate-y-1 font-sans text-[11px] font-bold tracking-wide text-primary-300 opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
          {t('destinations.planThis')}
        </div>
      </div>
    </button>
  );
};

export const DestinationsSection = () => {
  const { t } = useTranslation('home');
  const router = useRouter();
  const openLogin = useAuthUiStore((s) => s.openLogin);
  const { isAuthenticated, isLoading } = useSession();
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const dragStart = React.useRef({ x: 0, scroll: 0 });

  const handleGoAssistant = (destination?: string) => {
    if (isLoading) return;
    if (!isAuthenticated) {
      openLogin();
      return;
    }
    const path = destination
      ? `${ROUTES.ASSISTANT}?destination=${encodeURIComponent(destination)}`
      : ROUTES.ASSISTANT;
    router.push(path);
  };

  const handleMouseDown = React.useCallback((e: MouseEvent) => {
    const el = scrollRef.current;
    if (!el) return;
    setIsDragging(true);
    dragStart.current = { x: e.clientX, scroll: el.scrollLeft };
  }, []);

  const handleMouseMove = React.useCallback(
    (e: MouseEvent) => {
      if (!isDragging || !scrollRef.current) return;
      scrollRef.current.scrollLeft =
        dragStart.current.scroll - (e.clientX - dragStart.current.x);
    },
    [isDragging],
  );

  const handleMouseUp = React.useCallback(() => setIsDragging(false), []);

  return (
    <section
      aria-labelledby="dest-heading"
      className="overflow-hidden border-y border-neutral-700/80 bg-neutral-800 py-24 md:py-32"
    >
      <FadeUp>
        <div className="mb-10 px-6 md:px-12 lg:px-20">
          <div className="mx-auto flex max-w-[1200px] flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-3 font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-auxiliary-300">
                {t('destinations.label')}
              </p>
              <h2
                id="dest-heading"
                className="font-display text-[clamp(1.6rem,3.5vw,2.8rem)] font-bold italic text-neutral-100"
              >
                {t('destinations.heading1')}{' '}
                <span className="bg-linear-to-r from-primary-300 to-primary-500 bg-clip-text font-display font-bold not-italic text-transparent">
                  {t('destinations.heading2')}
                </span>
                .
              </h2>
            </div>
            <span className="font-sans text-xs tracking-wide text-neutral-400">
              {t('destinations.dragHint')}
            </span>
          </div>
        </div>
      </FadeUp>
      <div
        ref={scrollRef}
        role="list"
        aria-label={t('destinations.ariaLabel', 'Destination ideas')}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className={cn(
          'no-scrollbar flex select-none gap-3.5 overflow-x-auto px-6 pb-6 md:px-12 lg:px-20',
          isDragging ? 'cursor-grabbing' : 'cursor-grab',
        )}
        style={{ touchAction: 'pan-x pan-y' }}
      >
        {HOME_DESTINATIONS_CAROUSEL.map((d) => (
          <div key={d.name} role="listitem" className="shrink-0">
            <DestinationCard d={d} onPlan={handleGoAssistant} />
          </div>
        ))}
      </div>
    </section>
  );
};
