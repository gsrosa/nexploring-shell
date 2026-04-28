'use client';

import React from 'react';

import { cn } from '@gsrosa/nexploring-ui';
import { SparklesIcon } from 'lucide-react';

import {
  CHAT_ROUTE_STOPS,
  CHAT_TAGS,
  CHAT_USER_MESSAGE,
} from '../data/chat-demo-copy';
import { useInView } from '../hooks/use-in-view';

type ChatStep = 0 | 1 | 2;

export const AiChatDemo = () => {
  const [step, setStep] = React.useState<ChatStep>(0);
  const [charIdx, setCharIdx] = React.useState(0);
  const { ref, inView } = useInView(0.2);

  React.useEffect(() => {
    if (!inView || step !== 0) return;
    if (charIdx < CHAT_USER_MESSAGE.length) {
      const id = setTimeout(() => setCharIdx((c) => c + 1), 26);
      return () => clearTimeout(id);
    }
    const id = setTimeout(() => setStep(1), 400);
    return () => clearTimeout(id);
  }, [inView, step, charIdx]);

  React.useEffect(() => {
    if (step !== 1) return;
    const id = setTimeout(() => setStep(2), 1400);
    return () => clearTimeout(id);
  }, [step]);

  return (
    <div
      ref={ref}
      className="w-full rounded-[18px] p-[18px] lg:p-[22px] border border-white/15 bg-white/8 backdrop-blur-md"
    >
      <div className="flex items-center gap-2 mb-3.5">
        <div
          className="flex size-[30px] shrink-0 items-center justify-center rounded-full bg-primary-500 text-white"
          aria-hidden="true"
        >
          <SparklesIcon className="size-4" strokeWidth={2} />
        </div>
        <div>
          <div className="font-bold text-[12px] text-white">Nexploring</div>
          <div className="text-[10px] text-white/50">Travel Intelligence</div>
        </div>
        <div className="flex gap-1 ml-auto items-center" aria-hidden="true">
          <div className="w-1.5 h-1.5 rounded-full opacity-80 bg-primary-500" />
          <div className="w-1.5 h-1.5 rounded-full opacity-80 bg-auxiliary-500" />
          <div className="w-1.5 h-1.5 rounded-full opacity-80 bg-success-500" />
        </div>
      </div>

      {charIdx > 0 && (
        <div className="flex justify-end mb-3">
          <div className="rounded-[14px_14px_4px_14px] px-3 py-2.5 max-w-[88%] text-[12px] lg:text-[13px] text-white/90 leading-snug bg-white/15">
            {CHAT_USER_MESSAGE.slice(0, charIdx)}
            {step === 0 && (
              <span
                aria-hidden="true"
                className="animate-hp-blink inline-block w-0.5 h-[1em] ml-0.5 align-text-bottom bg-white/70"
              />
            )}
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="flex items-center gap-1.5 px-0.5 mb-2.5" aria-label="Nexploring is thinking">
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <div
                key={`dot-${i}`}
                className="w-[7px] h-[7px] rounded-full bg-primary-300 animate-hp-dot-bounce"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
          <span className="text-[11px] text-white/40">Nexploring is planning…</span>
        </div>
      )}

      {step === 2 && (
        <div
          className="animate-hp-fade-up rounded-[4px_14px_14px_14px] px-3.5 py-3 bg-white/10"
          role="status"
          aria-label="AI response"
        >
          <div className="text-[10px] font-bold text-auxiliary-300 uppercase tracking-[0.07em] mb-2">
            Iceland · Solo · 10 Days · September
          </div>

          <div className="flex items-center gap-1.5 mb-2.5 flex-wrap" aria-label="Route">
            {CHAT_ROUTE_STOPS.map((stop, i) => (
              <div key={stop} className="flex items-center gap-1.5">
                <div className="flex flex-col items-center gap-0.5">
                  <div
                    className={cn(
                      'w-2 h-2 rounded-full border-[1.5px] border-white/40',
                      i === 0 ? 'bg-primary-500' :
                      i === CHAT_ROUTE_STOPS.length - 1 ? 'bg-auxiliary-500' : 'bg-white/50',
                    )}
                  />
                  <span className="text-[10px] text-white/85 font-semibold whitespace-nowrap">
                    {stop}
                  </span>
                </div>
                {i < CHAT_ROUTE_STOPS.length - 1 && (
                  <div
                    className="w-4 h-px mb-3 shrink-0 bg-white/25"
                    aria-hidden="true"
                  />
                )}
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-1 mb-2.5" aria-label="Highlights">
            {CHAT_TAGS.map((tag) => (
              <span
                key={tag}
                className="rounded-full px-2 py-[3px] text-[10px] text-white/80 font-medium bg-white/12"
              >
                {tag}
              </span>
            ))}
          </div>

          <button
            type="button"
            className="w-full bg-auxiliary-500 text-neutral-900 border-none rounded-lg py-2 px-3.5 text-[11px] font-bold cursor-pointer hover:bg-auxiliary-300 transition-colors"
          >
            Build full itinerary →
          </button>
        </div>
      )}
    </div>
  );
};
