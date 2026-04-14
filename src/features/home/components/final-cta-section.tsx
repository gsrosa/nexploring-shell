import { Button } from '@gsrosa/atlas-ui';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthUiStore } from '@/features/auth/auth-ui-store';
import { useSession } from '@/features/auth/use-session';
import { ROUTES } from '@/shared/constants/shell-routes';
import { HOME_FINAL_CTA_BG } from '../data/home-hero';
import { FadeUp } from './fade-up';
import { HomePrimaryButton } from './home-primary-button';

export function FinalCtaSection() {
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
          <p className="mb-5 font-sans text-[10px] font-bold uppercase tracking-[0.35em] text-primary-600">
            Start exploring
          </p>
          <h2
            id="final-cta-heading"
            className="mb-5 font-display text-[clamp(2rem,5vw,3.4rem)] font-bold italic leading-[1.08] tracking-tight text-neutral-700"
          >
            Your next trip starts
            <br />
            with{' '}
            <span className="bg-gradient-to-r from-primary-500 to-auxiliary-400 bg-clip-text font-display font-bold not-italic text-transparent">
              one message
            </span>
            .
          </h2>
          <p className="mb-10 font-sans text-[clamp(15px,1.6vw,17px)] font-light leading-[1.75] text-neutral-600">
            Describe where you want to go. Atlas handles the rest.
          </p>

          <div className="mb-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <HomePrimaryButton type="button" className="group px-8 py-4" onClick={goPlan}>
              <Sparkles className="size-4" aria-hidden strokeWidth={2} />
              Start planning free
              <ArrowRight
                className="size-4 transition-transform group-hover:translate-x-1"
                aria-hidden
                strokeWidth={2}
              />
            </HomePrimaryButton>
            <Button variant="secondary" size="lg" className="rounded-full border border-neutral-200/90 shadow-sm" asChild>
              <a href="#how-it-works">See how it works</a>
            </Button>
          </div>

          <p className="font-sans text-xs tracking-wide text-neutral-400">
            Beta access · No credit card · Cancel anytime
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
