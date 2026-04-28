'use client';

import React from 'react';

import { Button } from '@gsrosa/nexploring-ui';
import { SparklesIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import {
  HOME_CHAT_AI_LINES,
  HOME_CHAT_USER_MSG,
} from '../data/home-chat-demo-copy';

type HomeChatDemoProps = {
  onViewFullItinerary: () => void;
};

export const HomeChatDemo = ({ onViewFullItinerary }: HomeChatDemoProps) => {
  const { t } = useTranslation('home');
  const [typed, setTyped] = React.useState('');
  const [thinking, setThinking] = React.useState(false);
  const [reply, setReply] = React.useState(false);
  const [visLines, setVisLines] = React.useState(0);

  React.useEffect(() => {
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

  React.useEffect(() => {
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
    <div className="relative overflow-hidden rounded-2xl border border-neutral-600/30 bg-neutral-800/90 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.4)] backdrop-blur-md">
      <div className="pointer-events-none absolute -right-20 -top-20 size-40 rounded-full bg-primary-400/15 blur-[60px]" />

      <div className="mb-4 flex items-center gap-3 border-b border-neutral-600/20 pb-3">
        <div className="flex size-8 items-center justify-center rounded-full bg-primary-500 shadow-md shadow-primary-500/25">
          <SparklesIcon className="size-4 text-white" strokeWidth={2} />
        </div>
        <div>
          <div className="font-sans text-xs font-bold text-neutral-100">
            Nexploring
          </div>
          <div className="flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-success-500 animate-hp-pulse-soft" />
            <span className="font-sans text-[10px] text-neutral-300">
              {t('hero.demo.active')}
            </span>
          </div>
        </div>
      </div>

      <div className="mb-3 flex justify-end">
        <div className="max-w-[88%] rounded-2xl rounded-br-sm bg-primary-600 px-3.5 py-2.5 text-[13px] font-medium leading-relaxed text-white shadow-md shadow-primary-500/20">
          {typed}
          {typed.length < HOME_CHAT_USER_MSG.length && (
            <span className="animate-hp-blink ml-0.5 inline-block">|</span>
          )}
        </div>
      </div>

      {thinking && (
        <div className="mb-2 flex items-center gap-1.5 px-3 py-2">
          {[0, 1, 2].map((i) => (
            <span
              key={`thinking-${i}`}
              className="size-1.5 rounded-full bg-neutral-500 animate-hp-dot-bounce"
              style={{ animationDelay: `${i * 180}ms` }}
            />
          ))}
          <span className="ml-2 font-sans text-[11px] text-neutral-400">
            {t('hero.thinking')}
          </span>
        </div>
      )}

      {reply && (
        <div className="animate-hp-fade-in">
          <div className="rounded-2xl rounded-tl-sm border border-neutral-600/25 bg-neutral-900 p-3.5">
            <div className="mb-3 font-sans text-[9px] font-bold uppercase tracking-[0.12em] text-auxiliary-300">
              {t('hero.demo.tag')}
            </div>
            {HOME_CHAT_AI_LINES.map((line, i) =>
              i < visLines ? (
                <div
                  key={line.text}
                  className="mb-2 flex items-center gap-2.5 last:mb-0 animate-hp-fade-in-up"
                >
                  <span className="text-sm">{line.icon}</span>
                  <span className="font-sans text-[13px] text-neutral-100">
                    {line.text}
                  </span>
                </div>
              ) : null,
            )}
            {visLines >= HOME_CHAT_AI_LINES.length && (
              <Button
                type="button"
                variant="primary"
                size="md"
                className="mt-3 w-full"
                onClick={onViewFullItinerary}
              >
                {t('hero.demo.viewItinerary')}
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
