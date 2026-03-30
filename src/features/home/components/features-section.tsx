import { HOME_FEATURE_ITEMS } from '../data/feature-items';
import { FadeUp } from './fade-up';
import { FeatureIcon } from './home-icons';

export function FeaturesSection() {
  return (
    <section
      aria-labelledby="features-heading"
      className="relative z-[1] bg-neutral-50 pt-20 pb-24 md:pt-28 md:pb-32 px-5 md:px-10"
    >
      <div className="max-w-[1200px] mx-auto">
        <FadeUp>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14 md:mb-20">
            <div className="max-w-2xl">
              <h2
                id="features-heading"
                className="font-display italic text-3xl md:text-4xl lg:text-[2.75rem] text-neutral-700 m-0 mb-4 leading-tight"
              >
                Cognitive exploration,
                <br />
                not just coordination.
              </h2>
              <p className="text-neutral-600 text-base md:text-lg font-light leading-relaxed max-w-md m-0">
                We move beyond static lists to living plans. Atlas learns your pace, then adapts when the
                weather — or your curiosity — shifts.
              </p>
            </div>
            <div className="font-sans text-auxiliary-400 text-xs tracking-widest uppercase shrink-0">
              01 / The advantage
            </div>
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
          {HOME_FEATURE_ITEMS.map((f, i) => (
            <FadeUp key={f.title} delay={i * 80}>
              <article className="group bg-neutral-100 p-8 md:p-10 rounded-xl transition-all duration-500 hover:bg-neutral-200 hover:-translate-y-1 border border-transparent hover:border-white/[0.06] h-full flex flex-col">
                <div className="w-12 h-12 flex items-center justify-center mb-6 text-primary-400">
                  <span className="scale-125">
                    <FeatureIcon index={i} />
                  </span>
                </div>
                <h3 className="font-display text-xl md:text-2xl text-neutral-700 m-0 mb-3">{f.title}</h3>
                <p className="text-neutral-600 font-sans text-sm leading-relaxed m-0 mb-4 flex-1">{f.body}</p>
                <div className="font-sans text-[10px] text-neutral-500 tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                  Atlas intelligence
                </div>
              </article>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
