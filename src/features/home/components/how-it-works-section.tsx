import { useEffect, useRef } from 'react';
import { HOME_HOW_STEPS } from '../data/home-how-steps';
import { FadeUp } from './fade-up';

export function HowItWorksSection() {
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = lineRef.current;
    if (!el) return;
    const ob = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.style.width = '100%';
          ob.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    ob.observe(el);
    return () => ob.disconnect();
  }, []);

  return (
    <section
      id="how-it-works"
      aria-labelledby="how-heading"
      className="border-y border-neutral-200/80 bg-neutral-100 px-6 py-24 md:px-12 md:py-32 lg:px-20"
    >
      <div className="mx-auto max-w-[1200px]">
        <FadeUp>
          <div className="mb-16 text-center md:mb-20">
            <p className="mb-4 font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-primary-600">
              Getting started
            </p>
            <h2
              id="how-heading"
              className="font-display text-[clamp(1.6rem,3.5vw,2.8rem)] font-bold italic text-neutral-700"
            >
              From idea to itinerary in{' '}
              <span className="bg-gradient-to-r from-primary-500 to-auxiliary-400 bg-clip-text font-display font-bold not-italic text-transparent">
                seconds
              </span>
              .
            </h2>
          </div>
        </FadeUp>

        <div className="relative">
          <div className="absolute left-[17%] right-[17%] top-16 hidden h-px bg-neutral-200 md:block">
            <div
              ref={lineRef}
              className="h-full rounded-full bg-gradient-to-r from-primary-500 to-auxiliary-400"
              style={{ width: 0, transition: 'width 1.2s ease 0.3s' }}
            />
          </div>

          <div className="relative z-10 grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6">
            {HOME_HOW_STEPS.map((s, i) => (
              <FadeUp key={s.n} delay={i * 140}>
                <div className="flex flex-col items-center px-4 text-center">
                  <div className="relative mb-6">
                    <span className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-display text-7xl font-bold leading-none text-neutral-700/[0.04]">
                      {s.n}
                    </span>
                    <div className="relative z-10 flex size-14 items-center justify-center rounded-full border border-neutral-300/60 bg-neutral-200 shadow-sm">
                      <s.icon className="size-5 text-primary-600" aria-hidden strokeWidth={2} />
                    </div>
                  </div>
                  <h3 className="mb-3 font-sans text-[15px] font-bold text-neutral-700">{s.title}</h3>
                  <p className="font-sans text-[13px] font-light leading-[1.7] text-neutral-600">{s.body}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
