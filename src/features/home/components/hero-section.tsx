import { Plane, Sparkles } from 'lucide-react';
import { useState, type KeyboardEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '@/shared/constants/shell-routes';
import { STITCH_HERO_IMAGE } from '../data/stitch-assets';
import { AiChatDemo } from './ai-chat-demo';

export function HeroSection() {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState('');

  function goPlan() {
    navigate(ROUTES.ASSISTANT);
  }

  function onSearchKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') goPlan();
  }

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative min-h-[min(100dvh,920px)] flex flex-col justify-center overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <img
          src={STITCH_HERO_IMAGE}
          alt=""
          className="h-full w-full object-cover brightness-[0.42] scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#111317]/25 to-[#111317]" />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto w-full px-5 md:px-10 pt-28 pb-16 md:pt-32 md:pb-20">
        <div className="flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-16">
          <div className="flex-1 text-center lg:text-left">
            <span className="font-sans text-primary-400 tracking-[0.35em] text-[10px] uppercase font-bold block mb-4 animate-pulse">
              Neural wayfinding engine
            </span>
            <h1
              id="hero-heading"
              className="font-display italic text-[2rem] sm:text-4xl md:text-5xl lg:text-[3.25rem] text-white font-bold leading-[1.08] tracking-tight text-glow-hero m-0 mb-5"
            >
              Your journey,{' '}
              <br className="hidden sm:block" />
              <span className="text-primary-700 not-italic font-display">synthesized by AI.</span>
            </h1>
            <p className="text-[15px] md:text-base text-neutral-600 max-w-[480px] mx-auto lg:mx-0 mb-8 leading-relaxed">
              Tell Atlas where instinct points you. Solo itineraries that adapt to weather, terrain, and
              the hidden rhythm of the trail — not another static PDF.
            </p>

            <div className="max-w-xl mx-auto lg:mx-0 mb-6">
              <div className="glass-panel-home p-1.5 rounded-full border border-white/10 flex items-center gap-1 shadow-[0_20px_50px_rgba(0,0,0,0.45)] transition-colors hover:border-primary-400/35">
                <Sparkles className="size-[22px] shrink-0 text-neutral-500" aria-hidden strokeWidth={1.5} />
                <label htmlFor="hero-intent" className="sr-only">
                  Describe your trip
                </label>
                <input
                  id="hero-intent"
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyDown={onSearchKeyDown}
                  placeholder="Where does your intuition take you?"
                  className="flex-1 min-w-0 bg-transparent border-none text-neutral-700 placeholder:text-neutral-500 text-[15px] py-3.5 px-2 focus:outline-none focus:ring-0"
                />
                <button
                  type="button"
                  onClick={goPlan}
                  className="hero-gradient-cta text-[#541100] px-5 sm:px-8 py-3.5 rounded-full font-bold text-[13px] sm:text-sm tracking-wide hover:brightness-110 transition-all active:scale-[0.98] whitespace-nowrap shrink-0"
                >
                  Initialize trip
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
              <button
                type="button"
                onClick={goPlan}
                className="inline-flex items-center gap-2 bg-auxiliary-500 text-[#00363d] border-none rounded-full px-6 py-3 font-extrabold text-sm cursor-pointer whitespace-nowrap transition-all hover:bg-auxiliary-300 hover:-translate-y-px active:translate-y-0 shadow-[0_4px_28px_rgba(0,227,253,0.25)]"
              >
                <Plane className="size-4 shrink-0" aria-hidden /> Plan with chat
              </button>
              <a
                href="#how-it-works"
                className="inline-flex items-center gap-2 text-white rounded-full px-5 py-3 font-semibold text-sm border border-white/20 bg-white/[0.08] hover:bg-white/15 transition-colors"
              >
                How it works ↓
              </a>
            </div>
          </div>

          <div className="w-full lg:w-[440px] lg:shrink-0">
            <AiChatDemo />
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-50 pointer-events-none z-10">
        <span className="font-sans text-[10px] uppercase tracking-widest text-white">Scroll</span>
        <span className="text-white text-lg motion-safe:animate-bounce" aria-hidden="true">
          ↓
        </span>
      </div>

      {/* Quick link for assistive tech */}
      <Link to={ROUTES.ASSISTANT} className="sr-only">
        Skip to trip planner
      </Link>
    </section>
  );
}
