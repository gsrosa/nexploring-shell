import { Button } from '@gsrosa/atlas-ui';
import { ArrowRight, ChevronDown, MessageSquare, Sparkles, Zap } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthUiStore } from '@/features/auth/auth-ui-store';
import { useSession } from '@/features/auth/use-session';
import { ROUTES } from '@/shared/constants/shell-routes';
import { HOME_HERO_BG } from '../data/home-hero';
import { FadeUp } from './fade-up';
import { GridBackground } from './grid-background';
import { HomeChatDemo } from './home-chat-demo';
import { HomePrimaryButton } from './home-primary-button';

export function HeroSection() {
  const navigate = useNavigate();
  const openLogin = useAuthUiStore((s) => s.openLogin);
  const { isAuthenticated, isLoading } = useSession();

  function goPlan() {
    if (isLoading) return;
    if (!isAuthenticated) {
      openLogin();
      return;
    }
    navigate(ROUTES.ASSISTANT);
  }

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-neutral-50"
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
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary-400/25 bg-primary-500/10 px-3.5 py-1.5 font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-primary-600">
              <Zap className="size-3" aria-hidden strokeWidth={2.5} />
              AI-powered trip intelligence
            </div>
          </FadeUp>

          <FadeUp delay={80}>
            <h1
              id="hero-heading"
              className="mb-6 font-display text-[clamp(2.2rem,5vw,3.8rem)] font-bold italic leading-[1.06] tracking-tight text-neutral-700"
            >
              Your trips, planned by{' '}
              <span className="bg-gradient-to-r from-primary-500 to-auxiliary-400 bg-clip-text font-display font-bold not-italic text-transparent">
                artificial intelligence
              </span>{' '}
              that understands you.
            </h1>
          </FadeUp>

          <FadeUp delay={160}>
            <p className="mb-8 max-w-[480px] font-sans text-[clamp(15px,1.5vw,17px)] font-light leading-[1.75] text-neutral-600">
              Atlas does not generate generic templates. It builds complete, day-by-day itineraries tailored to
              your pace, budget, and travel personality — powered by deep contextual AI.
            </p>
          </FadeUp>

          <FadeUp delay={240}>
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <HomePrimaryButton
                type="button"
                className="group px-7 py-3.5"
                onClick={goPlan}
              >
                <Sparkles className="size-4" aria-hidden strokeWidth={2} />
                Start planning free
                <ArrowRight
                  className="size-4 transition-transform group-hover:translate-x-1"
                  aria-hidden
                  strokeWidth={2}
                />
              </HomePrimaryButton>
              <Button variant="secondary" size="lg" className="rounded-full border border-neutral-200/90 shadow-sm" asChild>
                <a href="#how-it-works" className="inline-flex items-center gap-2">
                  <MessageSquare className="size-4" aria-hidden strokeWidth={2} />
                  How it works
                </a>
              </Button>
            </div>
          </FadeUp>

          <FadeUp delay={320}>
            <div className="flex flex-wrap items-center gap-6 font-sans text-[11px] text-neutral-500">
              <span className="flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-emerald-500" /> 1,200+ travelers
              </span>
              <span>47 countries</span>
              <span>Free beta</span>
            </div>
          </FadeUp>
        </div>

        <FadeUp delay={300} className="w-full shrink-0 md:w-[clamp(280px,35vw,420px)]">
          <HomeChatDemo onViewFullItinerary={goPlan} />
        </FadeUp>
      </div>

      <div className="pointer-events-none absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1.5 opacity-35">
        <span className="font-sans text-[9px] uppercase tracking-[0.25em] text-neutral-700">Scroll</span>
        <ChevronDown className="size-4 text-neutral-700 hp-bob" aria-hidden strokeWidth={2} />
      </div>

      <Link to={ROUTES.ASSISTANT} className="sr-only">
        Skip to trip planner
      </Link>
    </section>
  );
}
