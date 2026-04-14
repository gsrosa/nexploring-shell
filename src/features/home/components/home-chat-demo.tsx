import { Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';
import { HOME_CHAT_AI_LINES, HOME_CHAT_USER_MSG } from '../data/home-chat-demo-copy';
import { HomePrimaryButton } from './home-primary-button';

interface HomeChatDemoProps {
  onViewFullItinerary: () => void;
}

export function HomeChatDemo({ onViewFullItinerary }: HomeChatDemoProps) {
  const [typed, setTyped] = useState('');
  const [thinking, setThinking] = useState(false);
  const [reply, setReply] = useState(false);
  const [visLines, setVisLines] = useState(0);

  useEffect(() => {
    let i = 0;
    const iv = window.setInterval(() => {
      i += 1;
      setTyped(HOME_CHAT_USER_MSG.slice(0, i));
      if (i >= HOME_CHAT_USER_MSG.length) {
        window.clearInterval(iv);
        window.setTimeout(() => setThinking(true), 400);
        window.setTimeout(() => {
          setThinking(false);
          setReply(true);
        }, 2200);
      }
    }, 22);
    return () => window.clearInterval(iv);
  }, []);

  useEffect(() => {
    if (!reply) return;
    let l = 0;
    const iv = window.setInterval(() => {
      l += 1;
      setVisLines(l);
      if (l >= HOME_CHAT_AI_LINES.length) window.clearInterval(iv);
    }, 220);
    return () => window.clearInterval(iv);
  }, [reply]);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-neutral-300/30 bg-neutral-100/90 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.4)] backdrop-blur-md">
      <div className="pointer-events-none absolute -right-20 -top-20 size-40 rounded-full bg-primary-400/15 blur-[60px]" />

      <div className="mb-4 flex items-center gap-3 border-b border-neutral-300/20 pb-3">
        <div className="flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-primary-400 to-primary-600 shadow-md shadow-primary-500/25">
          <Sparkles className="size-4 text-white" strokeWidth={2} />
        </div>
        <div>
          <div className="font-sans text-xs font-bold text-neutral-700">Atlas AI</div>
          <div className="flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-emerald-500 hp-pulse-soft" />
            <span className="font-sans text-[10px] text-neutral-500">Active</span>
          </div>
        </div>
      </div>

      <div className="mb-3 flex justify-end">
        <div className="max-w-[88%] rounded-2xl rounded-br-sm bg-gradient-to-br from-primary-400 via-primary-500 to-primary-600 px-3.5 py-2.5 text-[13px] font-medium leading-relaxed text-white shadow-md shadow-primary-500/20">
          {typed}
          {typed.length < HOME_CHAT_USER_MSG.length && (
            <span className="hp-cursor ml-0.5 inline-block">|</span>
          )}
        </div>
      </div>

      {thinking && (
        <div className="mb-2 flex items-center gap-1.5 px-3 py-2">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="size-1.5 rounded-full bg-neutral-400 hp-thinking-dot"
              style={{ animationDelay: `${i * 180}ms` }}
            />
          ))}
          <span className="ml-2 font-sans text-[11px] text-neutral-500">Atlas is planning…</span>
        </div>
      )}

      {reply && (
        <div className="hp-fade-in">
          <div className="rounded-2xl rounded-tl-sm border border-neutral-300/25 bg-neutral-200/60 p-3.5">
            <div className="mb-3 font-sans text-[9px] font-bold uppercase tracking-[0.12em] text-primary-600">
              Iceland · 10 days · September
            </div>
            {HOME_CHAT_AI_LINES.map((line, i) =>
              i < visLines ? (
                <div key={line.text} className="mb-2 flex items-center gap-2.5 last:mb-0 hp-fade-in-up">
                  <span className="text-sm">{line.icon}</span>
                  <span className="font-sans text-[13px] text-neutral-700">{line.text}</span>
                </div>
              ) : null,
            )}
            {visLines >= HOME_CHAT_AI_LINES.length && (
              <HomePrimaryButton
                type="button"
                size="md"
                className="mt-3 w-full justify-center rounded-xl py-2.5 text-[13px]"
                onClick={onViewFullItinerary}
              >
                View full itinerary →
              </HomePrimaryButton>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
