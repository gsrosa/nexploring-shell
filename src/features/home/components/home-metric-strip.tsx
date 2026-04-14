import { useEffect, useRef, useState } from 'react';
import { HOME_METRICS } from '../data/home-metrics';
import { useAnimatedMetric } from '../hooks/use-animated-metric';
import { FadeUp } from './fade-up';

function MetricCell({
  to,
  suffix,
  label,
  decimals,
  active,
  delay,
}: {
  to: number;
  suffix: string;
  label: string;
  decimals: number;
  active: boolean;
  delay: number;
}) {
  const v = useAnimatedMetric(to, active, decimals);
  return (
    <FadeUp delay={delay}>
      <div className="text-center">
        <div className="font-display text-[clamp(2rem,4vw,3rem)] font-bold leading-none text-neutral-700">
          {v}
          {suffix}
        </div>
        <div className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500">
          {label}
        </div>
      </div>
    </FadeUp>
  );
}

export function HomeMetricStrip() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ob = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setActive(true);
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
      ref={ref}
      className="relative overflow-hidden border-y border-neutral-200/80 bg-neutral-100 py-16"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(90deg, transparent, transparent 120px, rgb(255 87 34 / 0.35) 121px)',
        }}
      />
      <div className="relative mx-auto w-full max-w-[1200px] px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {HOME_METRICS.map((m, i) => (
            <MetricCell
              key={m.label}
              to={m.to}
              suffix={m.suffix}
              label={m.label}
              decimals={m.decimals}
              active={active}
              delay={i * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
