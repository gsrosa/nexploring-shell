import { STITCH_MAP_UI } from '../data/stitch-assets';
import { FadeUp } from './fade-up';

export function PrecisionSection() {
  return (
    <section
      aria-labelledby="precision-heading"
      className="py-20 md:py-28 bg-neutral-50 px-5 md:px-10 overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
        <FadeUp>
          <div className="space-y-8 order-2 lg:order-1">
            <div>
              <span className="font-sans text-auxiliary-400 text-xs tracking-widest uppercase block mb-3">
                02 / Technical layer
              </span>
              <h2
                id="precision-heading"
                className="font-display italic text-3xl md:text-4xl lg:text-5xl text-neutral-700 m-0 leading-tight"
              >
                Hyper-precision
                <br />
                environment mapping
              </h2>
            </div>
            <ul className="space-y-8 list-none m-0 p-0">
              {[
                {
                  t: 'Topo-aware routing',
                  d: 'Terrain, season, and pacing inform every segment — not just drive times between pins.',
                },
                {
                  t: 'Solo-first safety context',
                  d: 'Neighborhood and activity signals tuned for traveling alone, without the noise of generic tips.',
                },
                {
                  t: 'Living itinerary sync',
                  d: 'Change one day and the rest reshuffles. Your plan stays a single coherent story.',
                },
              ].map((item) => (
                <li key={item.t} className="flex gap-5 items-start">
                  <div
                    className="mt-0.5 w-10 h-10 rounded-full border border-neutral-400 flex items-center justify-center shrink-0"
                    aria-hidden="true"
                  >
                    <span className="text-auxiliary-400 text-lg font-bold">◇</span>
                  </div>
                  <div>
                    <h3 className="text-neutral-700 font-bold text-base m-0 mb-1.5">{item.t}</h3>
                    <p className="text-neutral-600 text-sm font-light leading-relaxed m-0">{item.d}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </FadeUp>

        <FadeUp delay={120}>
          <div className="relative order-1 lg:order-2">
            <div
              className="absolute -inset-8 bg-auxiliary-500/10 blur-[80px] rounded-full pointer-events-none"
              aria-hidden="true"
            />
            <div className="relative bg-neutral-300 rounded-3xl p-3 shadow-[0_24px_60px_rgba(0,0,0,0.4)] border border-white/[0.06] aspect-square lg:aspect-[4/3] flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 opacity-45 mix-blend-screen">
                <img
                  src={STITCH_MAP_UI}
                  alt=""
                  className="w-full h-full object-cover grayscale brightness-125 contrast-125"
                />
              </div>
              <div className="absolute top-5 right-5 z-[1]">
                <div className="glass-panel-home px-3 py-2.5 rounded-xl border border-white/10 flex items-center gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-green-400 motion-safe:animate-pulse" />
                  <span className="font-sans text-[10px] text-neutral-700 uppercase tracking-widest">
                    Planner active
                  </span>
                </div>
              </div>
              <div className="absolute bottom-5 left-5 right-5 z-[1]">
                <div className="glass-panel-home p-5 rounded-2xl border border-white/10 flex flex-wrap sm:flex-nowrap justify-between items-center gap-4">
                  <div>
                    <div className="text-[10px] text-neutral-500 uppercase tracking-[0.2em] mb-1">
                      Confidence
                    </div>
                    <div className="text-2xl font-display text-neutral-700">High</div>
                  </div>
                  <div className="hidden sm:block w-px h-10 bg-white/10 shrink-0" aria-hidden="true" />
                  <div className="flex-1 min-w-[140px]">
                    <div className="text-[10px] text-neutral-500 uppercase tracking-[0.2em] mb-1">
                      Route synthesis
                    </div>
                    <div className="w-full bg-white/10 h-1.5 rounded-full mt-2 overflow-hidden">
                      <div
                        className="bg-primary-400 h-full w-[72%] rounded-full shadow-[0_0_12px_rgba(255,181,160,0.45)]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
