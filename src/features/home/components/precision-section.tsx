import { Heart, User, Users } from 'lucide-react';
import { HOME_PRECISION_BULLETS, HOME_PRECISION_DAYS } from '../data/home-precision';
import { FadeUp } from './fade-up';

const MODES = [
  { icon: User, label: 'Solo' as const },
  { icon: Heart, label: 'Couple' as const },
  { icon: Users, label: 'Family' as const },
];

export function PrecisionSection() {
  return (
    <section
      aria-labelledby="precision-heading"
      className="overflow-hidden bg-neutral-50 px-6 py-24 md:px-12 md:py-32 lg:px-20"
    >
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <FadeUp>
          <div>
            <p className="mb-4 font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-primary-600">
              Under the hood
            </p>
            <h2
              id="precision-heading"
              className="mb-5 font-display text-[clamp(1.6rem,3.5vw,2.8rem)] font-bold italic leading-[1.12] text-neutral-700"
            >
              Planning intelligence,
              <br />
              <span className="bg-gradient-to-r from-primary-500 to-auxiliary-400 bg-clip-text font-display font-bold not-italic text-transparent">
                not just planning.
              </span>
            </h2>
            <p className="mb-10 max-w-[440px] font-sans text-[15px] font-light leading-[1.75] text-neutral-600">
              Atlas reasons through terrain, season, safety, and pacing to build something that works on the
              ground — not a clipboard of links.
            </p>
            <div className="flex flex-col gap-7">
              {HOME_PRECISION_BULLETS.map((p) => (
                <div key={p.title} className="flex items-start gap-4">
                  <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full border border-neutral-300/50 bg-neutral-200">
                    <span className="text-sm font-bold text-auxiliary-600">◇</span>
                  </div>
                  <div>
                    <div className="mb-1.5 font-sans text-[15px] font-bold text-neutral-700">{p.title}</div>
                    <p className="font-sans text-[13px] font-light leading-[1.65] text-neutral-600">{p.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeUp>

        <FadeUp delay={120}>
          <div className="relative">
            <div className="pointer-events-none absolute -inset-10 rounded-full bg-auxiliary-400/8 blur-[80px]" />
            <div className="relative flex flex-col gap-4 rounded-3xl border border-neutral-300/40 bg-neutral-100 p-6 shadow-[0_28px_90px_rgba(0,0,0,0.4)] backdrop-blur-sm">
              <div className="flex flex-wrap gap-2">
                {MODES.map((mode, i) => (
                  <div
                    key={mode.label}
                    className={
                      i === 0
                        ? 'flex cursor-default items-center gap-2 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 px-3.5 py-2 font-sans text-xs font-bold text-white shadow-md shadow-primary-500/25'
                        : 'flex cursor-default items-center gap-2 rounded-xl border border-neutral-200/90 bg-neutral-50 px-3.5 py-2 font-sans text-xs font-bold text-neutral-500'
                    }
                  >
                    <mode.icon className="size-3.5" aria-hidden strokeWidth={2} />
                    {mode.label}
                  </div>
                ))}
              </div>

              <div className="rounded-2xl border border-neutral-200/80 bg-neutral-50/90 p-5">
                <div className="mb-4 flex items-center justify-between">
                  <div className="font-sans text-[9px] font-bold uppercase tracking-[0.15em] text-primary-600">
                    Iceland · Solo · September
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="size-1.5 rounded-full bg-emerald-500 hp-pulse-soft" />
                    <span className="font-sans text-[10px] font-bold text-neutral-500">Live</span>
                  </div>
                </div>
                {HOME_PRECISION_DAYS.map((item) => (
                  <div
                    key={item.day}
                    className="flex items-center gap-3 border-b border-neutral-200/60 py-2.5 last:border-b-0"
                  >
                    <span className="w-10 font-sans text-[10px] font-bold text-primary-600">{item.day}</span>
                    <span className="flex-1 font-sans text-[13px] text-neutral-700">{item.title}</span>
                    <span className="rounded-full bg-neutral-200/80 px-2 py-0.5 font-sans text-[9px] font-medium text-neutral-600">
                      {item.tag}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between px-1">
                <div>
                  <div className="mb-1 font-sans text-[9px] font-bold uppercase tracking-[0.15em] text-neutral-500">
                    Confidence
                  </div>
                  <div className="font-display text-lg font-bold text-neutral-700">97%</div>
                </div>
                <div className="h-8 w-px bg-neutral-200" />
                <div>
                  <div className="mb-1 font-sans text-[9px] font-bold uppercase tracking-[0.15em] text-neutral-500">
                    Est. budget
                  </div>
                  <div className="font-display text-lg font-bold text-neutral-700">$2,100</div>
                </div>
                <div className="h-8 w-px bg-neutral-200" />
                <div>
                  <div className="mb-1 font-sans text-[9px] font-bold uppercase tracking-[0.15em] text-neutral-500">
                    Activities
                  </div>
                  <div className="font-display text-lg font-bold text-neutral-700">24</div>
                </div>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
