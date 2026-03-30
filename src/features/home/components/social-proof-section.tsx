import { HOME_STATS } from '../data/stats';
import { HOME_TESTIMONIALS } from '../data/testimonials';
import { AnimatedCounter } from './animated-counter';
import { FadeUp } from './fade-up';

export function SocialProofSection() {
  return (
    <section aria-labelledby="proof-heading" className="px-5 py-20 md:py-28 md:px-10 bg-neutral-50">
      <div className="max-w-[1200px] mx-auto">
        <FadeUp>
          <div
            role="note"
            className="rounded-2xl px-5 py-6 md:px-8 md:py-8 text-center mb-10 md:mb-14 border border-primary-400/20 bg-neutral-100"
          >
            <p className="text-[11px] font-bold text-primary-400 mb-2 tracking-wide">🌿 Atlas is in private beta</p>
            <p className="text-sm md:text-base text-neutral-600 leading-relaxed m-0">
              1,200 solo travelers have already planned trips to 47 countries.
              <br />
              We&apos;re opening early access in waves.
            </p>
          </div>
        </FadeUp>

        <h2 id="proof-heading" className="sr-only">
          By the numbers
        </h2>

        <div className="grid grid-cols-3 gap-2 md:gap-5 mb-10 md:mb-14">
          {HOME_STATS.map((s, i) => (
            <FadeUp key={s.label} delay={i * 100}>
              <div
                className="text-center bg-neutral-100 border border-white/[0.06] rounded-2xl px-2 py-5 md:px-4 md:py-7"
                style={{ boxShadow: '0 16px 40px rgba(0,0,0,0.28)' }}
              >
                <span className="block text-2xl md:text-4xl font-black text-primary-400 tracking-tight leading-none">
                  <AnimatedCounter to={s.to} suffix={s.suffix} />
                </span>
                <span className="block text-[10px] md:text-xs text-neutral-600 mt-2 font-medium">
                  {s.label}
                </span>
              </div>
            </FadeUp>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {HOME_TESTIMONIALS.map((t, i) => (
            <FadeUp key={t.name} delay={i * 130}>
              <figure
                className="bg-neutral-100 border border-white/[0.06] rounded-2xl px-5 py-6 md:px-7 md:py-7 m-0"
                style={{ boxShadow: '0 16px 40px rgba(0,0,0,0.28)' }}
              >
                <blockquote className="text-sm md:text-[15px] text-neutral-600 leading-relaxed italic m-0 mb-4">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center text-sm font-extrabold text-[#5f1500] shrink-0 hero-gradient-cta"
                    aria-hidden="true"
                  >
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-neutral-700">{t.name}</div>
                    <div className="text-[11px] text-neutral-500">{t.city}</div>
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
