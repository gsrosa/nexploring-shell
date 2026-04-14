import { HOME_TESTIMONIALS_MARKETING } from '../data/home-testimonials-marketing';
import { FadeUp } from './fade-up';

export function SocialProofSection() {
  return (
    <section
      aria-labelledby="social-heading"
      className="bg-neutral-50 px-6 py-24 md:px-12 md:py-32 lg:px-20"
    >
      <div className="mx-auto max-w-[1200px]">
        <FadeUp>
          <div className="mb-16 text-center">
            <p className="mb-4 font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-primary-600">
              Early access
            </p>
            <h2
              id="social-heading"
              className="font-display text-[clamp(1.6rem,3.5vw,2.8rem)] font-bold italic text-neutral-700"
            >
              Trusted by travelers who plan{' '}
              <span className="bg-gradient-to-r from-primary-500 to-auxiliary-400 bg-clip-text font-display font-bold not-italic text-transparent">
                differently
              </span>
              .
            </h2>
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {HOME_TESTIMONIALS_MARKETING.map((t, i) => (
            <FadeUp key={t.name} delay={i * 100}>
              <figure className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-200/80 bg-neutral-50/80 p-8 shadow-sm">
                <span className="pointer-events-none absolute -top-2 left-4 select-none font-display text-[100px] font-bold leading-none text-primary-500/[0.07]">
                  &ldquo;
                </span>
                <blockquote className="relative z-10 mb-6 flex-1 font-display text-[clamp(14px,1.4vw,16px)] italic leading-[1.65] text-neutral-700">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="flex items-center gap-3">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary-400 to-primary-600 font-sans text-xs font-bold text-white shadow-md shadow-primary-500/20">
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="font-sans text-[13px] font-bold text-neutral-700">{t.name}</div>
                    <div className="font-sans text-[11px] text-neutral-500">{t.city}</div>
                  </div>
                </figcaption>
              </figure>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
