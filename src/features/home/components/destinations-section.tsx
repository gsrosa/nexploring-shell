import { Link } from 'react-router-dom';
import { ROUTES } from '@/shared/constants/shell-routes';
import { HOME_DESTINATIONS } from '../data/destinations';
import { FadeUp } from './fade-up';

export function DestinationsSection() {
  return (
    <section
      aria-labelledby="dest-heading"
      className="bg-neutral-100 py-20 md:py-28 overflow-hidden pl-5 md:pl-10"
    >
      <div className="max-w-[1200px] mx-auto pr-5 md:pr-10 mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <span className="block text-[10px] md:text-[11px] font-extrabold tracking-[0.2em] uppercase text-primary-400 mb-2">
            Active syntheses
          </span>
          <h2
            id="dest-heading"
            className="font-display italic text-3xl md:text-4xl text-neutral-700 m-0 tracking-tight"
          >
            Where will you go first?
          </h2>
          <p className="text-sm text-neutral-600 mt-2 max-w-lg m-0 leading-relaxed">
            Every destination has a starter path you can personalize in one conversation.
          </p>
        </div>
        <div className="flex gap-2 shrink-0" aria-hidden="true">
          <span className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center text-neutral-700">
            ‹
          </span>
          <span className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center text-neutral-700">
            ›
          </span>
        </div>
      </div>

      <div
        role="list"
        aria-label="Destination journeys"
        className="no-scrollbar flex gap-5 md:gap-6 overflow-x-auto pb-6 pr-5 md:pr-10 snap-x snap-mandatory"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {HOME_DESTINATIONS.map((d, i) => (
          <FadeUp key={d.name} delay={i * 50} className="snap-start shrink-0">
            <article
              role="listitem"
              className="group relative w-[min(88vw,400px)] h-[min(78vh,560px)] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.35)]"
            >
              {d.imageUrl ? (
                <>
                  <img
                    src={d.imageUrl}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111317] via-[#111317]/20 to-transparent opacity-90" />
                </>
              ) : (
                <>
                  <div
                    className="absolute inset-0 flex items-center justify-center text-5xl md:text-6xl"
                    style={{
                      background: `linear-gradient(160deg, ${d.color}ee, ${d.color}66)`,
                    }}
                    aria-hidden="true"
                  >
                    {d.emoji}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111317]/95 via-transparent to-transparent" />
                </>
              )}
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10 z-[1]">
                {d.badges && d.badges.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {d.badges.map((b) => (
                      <span
                        key={b}
                        className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full font-sans text-[10px] text-white tracking-widest uppercase"
                      >
                        {b}
                      </span>
                    ))}
                  </div>
                )}
                {!d.badges && (
                  <span className="inline-block bg-white/10 backdrop-blur-md px-3 py-1 rounded-full font-sans text-[10px] text-white tracking-widest uppercase mb-4">
                    {d.tag}
                  </span>
                )}
                <h3 className="font-display italic text-2xl md:text-3xl text-white m-0 mb-2">{d.name}</h3>
                <p className="text-white/70 text-sm m-0 mb-1 font-medium">{d.country}</p>
                <p className="text-white/80 text-sm m-0 mb-6 line-clamp-2 leading-relaxed">{d.hook}</p>
                <Link
                  to={ROUTES.ASSISTANT}
                  className="block w-full text-center py-3.5 rounded-full border border-primary-400/50 text-primary-400 font-bold tracking-widest uppercase text-[11px] hover:bg-primary-400 hover:text-[#5f1500] transition-all duration-300 no-underline"
                >
                  Initialize trip
                </Link>
              </div>
            </article>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
