import { HOW_IT_WORKS_STEPS } from '../data/how-it-works-steps';
import { FadeUp } from './fade-up';

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      aria-labelledby="hiw-heading"
      className="px-5 py-20 md:py-28 md:px-10 bg-neutral-100 border-y border-white/[0.04]"
    >
      <div className="max-w-[1200px] mx-auto">
        <FadeUp>
          <div className="text-center mb-12 md:mb-16">
            <span className="block text-[10px] md:text-[11px] font-extrabold tracking-[0.2em] uppercase text-primary-400 mb-3">
              How it works
            </span>
            <h2
              id="hiw-heading"
              className="font-display italic text-3xl md:text-4xl text-neutral-700 m-0 tracking-tight leading-[1.15]"
            >
              From idea to itinerary
              <br />
              in one conversation
            </h2>
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-8 relative">
          <div
            className="hidden lg:block absolute top-10 left-[18%] right-[18%] h-px z-0 opacity-40"
            style={{
              background:
                'linear-gradient(to right, rgba(255,181,160,0.2), rgba(0,227,253,0.5), rgba(255,181,160,0.2))',
            }}
            aria-hidden="true"
          />
          {HOW_IT_WORKS_STEPS.map((s, i) => (
            <FadeUp key={s.num} delay={i * 120}>
              <article className="relative z-[1] bg-neutral-200 border border-white/[0.05] rounded-2xl p-6 md:p-7 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-12 h-12 md:w-14 md:h-14 rounded-[14px] flex items-center justify-center text-xl md:text-2xl shrink-0 border border-primary-400/25"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255,181,160,0.18), rgba(0,227,253,0.12))',
                    }}
                    aria-hidden="true"
                  >
                    {s.icon}
                  </div>
                  <span className="text-[11px] font-extrabold text-primary-400 tracking-[0.12em] uppercase">
                    Step {s.num}
                  </span>
                </div>
                <h3 className="text-lg md:text-xl font-extrabold text-neutral-700 m-0 mb-2 tracking-tight font-display">
                  {s.title}
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed m-0">{s.body}</p>
              </article>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
