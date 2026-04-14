import { useEffect, useState } from 'react';

export function useAnimatedMetric(to: number, active: boolean, decimals = 0) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!active) return;
    const dur = 2000;
    const start = performance.now();
    let rafId: number;
    const frame = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      const ease = 1 - (1 - p) ** 3;
      setVal(parseFloat((ease * to).toFixed(decimals)));
      if (p < 1) rafId = requestAnimationFrame(frame);
    };
    rafId = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(rafId);
  }, [active, to, decimals]);

  return val;
}
