import { memo } from 'react';

export const GridBackground = memo(function GridBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <svg
        className="absolute inset-0 size-full opacity-[0.06]"
        viewBox="0 0 1200 800"
        fill="none"
        aria-hidden
      >
        <path
          d="M0 400 Q200 300 400 380 Q600 460 800 340 Q1000 220 1200 300"
          className="stroke-primary-500"
          strokeWidth="1"
        />
        <path
          d="M0 450 Q200 350 400 430 Q600 510 800 390 Q1000 270 1200 350"
          className="stroke-primary-500"
          strokeWidth="0.8"
        />
        <path
          d="M0 500 Q200 400 400 480 Q600 560 800 440 Q1000 320 1200 400"
          className="stroke-primary-500"
          strokeWidth="0.6"
        />
        <path
          d="M0 350 Q200 250 400 330 Q600 410 800 290 Q1000 170 1200 250"
          className="stroke-auxiliary-500"
          strokeWidth="0.5"
        />
        <path
          d="M0 550 Q200 450 400 530 Q600 610 800 490 Q1000 370 1200 450"
          className="stroke-auxiliary-500"
          strokeWidth="0.5"
        />
      </svg>
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 60px, rgb(0 0 0 / 0.06) 61px), repeating-linear-gradient(90deg, transparent, transparent 60px, rgb(0 0 0 / 0.06) 61px)',
        }}
      />
      <div className="absolute left-1/2 top-0 h-[600px] w-[min(100%,800px)] -translate-x-1/2 rounded-full bg-primary-400/10 blur-[120px]" />
      <div className="absolute right-0 top-1/3 h-[400px] w-[400px] rounded-full bg-auxiliary-400/8 blur-[100px]" />
    </div>
  );
});
