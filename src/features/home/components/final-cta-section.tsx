import { Plane } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/shared/constants/shell-routes';
import { STITCH_CTA_NIGHT } from '../data/stitch-assets';
import { FadeUp } from './fade-up';

export function FinalCtaSection() {
  return (
    <section
      aria-labelledby="final-cta-heading"
      className="relative py-24 md:py-36 px-5 md:px-10 flex flex-col items-center justify-center text-center overflow-hidden min-h-[420px] md:min-h-[520px]"
    >
      <div className="absolute inset-0 z-0">
        <img
          src={STITCH_CTA_NIGHT}
          alt=""
          className="w-full h-full object-cover brightness-[0.35]"
        />
        <div className="absolute inset-0 bg-[#111317]/65" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto">
        <FadeUp>
          <div className="text-3xl md:text-5xl mb-4 text-primary-400" aria-hidden="true">
            ✦
          </div>
          <h2
            id="final-cta-heading"
            className="font-display italic text-3xl md:text-5xl lg:text-6xl text-white m-0 mb-4 tracking-tight leading-tight"
          >
            Redefine wandering.
          </h2>
          <p className="text-base md:text-lg text-neutral-600 mt-0 mb-8 md:mb-10 leading-relaxed max-w-xl mx-auto font-light">
            Step into travel planning that respects both the machine and the explorer. One message is enough
            to start.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to={ROUTES.ASSISTANT}
              className="inline-flex items-center gap-2.5 hero-gradient-cta text-[#541100] border-none rounded-full px-10 md:px-14 py-4 font-extrabold text-sm tracking-[0.12em] uppercase no-underline hover:brightness-110 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_40px_rgba(255,87,34,0.35)]"
            >
              <Plane className="size-4 shrink-0" aria-hidden /> Initialize Atlas
            </Link>
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center px-10 md:px-12 py-4 border border-white/20 text-white rounded-full font-bold text-sm tracking-[0.12em] uppercase hover:bg-white/10 transition-colors no-underline"
            >
              How it works
            </a>
          </div>
          <span className="block text-[11px] md:text-xs text-neutral-500 mt-6">
            Beta access · No credit card · Cancel anytime
          </span>
        </FadeUp>
      </div>
    </section>
  );
}
