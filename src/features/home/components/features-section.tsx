import { cn } from '@gsrosa/atlas-ui';
import { HOME_FEATURE_BLOCKS } from '../data/home-features';
import { FadeUp } from './fade-up';

export function FeaturesSection() {
  return (
    <section
      aria-labelledby="features-heading"
      className="bg-neutral-50 px-6 py-24 md:px-12 md:py-32 lg:px-20"
    >
      <div className="mx-auto max-w-[1200px]">
        <FadeUp>
          <div className="mb-16 flex flex-wrap items-end justify-between gap-6 md:mb-20">
            <div className="max-w-[560px]">
              <p className="mb-4 font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-primary-600">
                The advantage
              </p>
              <h2
                id="features-heading"
                className="mb-4 font-display text-[clamp(1.6rem,3.5vw,2.8rem)] font-bold italic leading-[1.12] text-neutral-700"
              >
                Not another trip planner.
                <br />
                <span className="bg-gradient-to-r from-primary-500 to-auxiliary-400 bg-clip-text font-display font-bold not-italic text-transparent">
                  A trip intelligence engine.
                </span>
              </h2>
              <p className="font-sans text-[15px] font-light leading-[1.75] text-neutral-600">
                Atlas processes terrain, weather, local safety data, and your personal travel profile to build
                plans that actually work on the ground.
              </p>
            </div>
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {HOME_FEATURE_BLOCKS.map((f, i) => (
            <FadeUp key={f.title} delay={i * 80}>
              <div
                className={cn(
                  'group relative h-full overflow-hidden rounded-2xl border border-neutral-200/80 bg-neutral-100/80 p-8 transition-all duration-300 md:p-10',
                  'hover:border-neutral-400 hover:bg-neutral-200 hover:shadow-[0_24px_70px_rgba(0,0,0,0.35)]',
                )}
              >
                <div
                  className={cn(
                    'pointer-events-none absolute right-0 top-0 size-32 rounded-full opacity-0 blur-[80px] transition-opacity duration-300 group-hover:opacity-100',
                    f.accent === 'primary' ? 'bg-primary-400/25' : 'bg-auxiliary-400/20',
                  )}
                />
                <div
                  className={cn(
                    'mb-6 flex size-12 items-center justify-center rounded-xl transition-colors',
                    f.accent === 'primary'
                      ? 'bg-primary-500/10 group-hover:bg-primary-500/18'
                      : 'bg-auxiliary-500/10 group-hover:bg-auxiliary-500/18',
                  )}
                >
                  <f.icon
                    className={cn(
                      'size-5',
                      f.accent === 'primary' ? 'text-primary-600' : 'text-auxiliary-600',
                    )}
                    aria-hidden
                    strokeWidth={2}
                  />
                </div>
                <h3 className="mb-3 font-display text-lg font-semibold leading-tight text-neutral-700">
                  {f.title}
                </h3>
                <p className="font-sans text-[14px] font-light leading-[1.7] text-neutral-600">{f.body}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
