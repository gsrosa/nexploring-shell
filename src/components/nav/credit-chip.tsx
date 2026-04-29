'use client';

import React from 'react';

import { cn } from '@gsrosa/nexploring-ui';
import { CoinsIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { useCreditsStore } from '@/features/credits/credits-store';

import { CREDIT_THRESHOLDS } from '@/shared/constants/credits';

export const CreditChip = () => {
  const { t } = useTranslation('common');
  const balance = useCreditsStore((s) => s.balance);
  const lastDeduction = useCreditsStore((s) => s.lastDeduction);
  const openPurchaseModal = useCreditsStore((s) => s.openPurchaseModal);

  const [displayed, setDisplayed] = React.useState(balance);
  const [shaking, setShaking] = React.useState(false);

  // Animate number down to new balance when a deduction fires
  React.useEffect(() => {
    if (balance == null) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (displayed == null) { setDisplayed(balance); return; }
    if (balance === displayed) return;

    setShaking(true);
    const start = displayed;
    const end = balance;
    const duration = 600;
    const startTime = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      setDisplayed(Math.round(start + (end - start) * progress));
      if (progress < 1) requestAnimationFrame(tick);
      else setShaking(false);
    };
    requestAnimationFrame(tick);
  }, [lastDeduction]); // eslint-disable-line react-hooks/exhaustive-deps

  if (balance == null) return null;

  const isEmpty = balance === 0;
  const isLow = balance > 0 && balance <= CREDIT_THRESHOLDS.LOW_BALANCE;

  return (
    <button
      type="button"
      onClick={openPurchaseModal}
      aria-label={t('credits.ariaLabel', { count: balance ?? 0 })}
      className={cn(
        'flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold transition-colors',
        isEmpty
          ? 'border-danger-500/30 bg-danger-500/10 text-danger-400 hover:bg-danger-500/20'
          : isLow
            ? 'border-warning-500/30 bg-warning-500/10 text-warning-400 hover:bg-warning-500/20'
            : 'border-neutral-700 bg-neutral-800 text-neutral-300 hover:bg-neutral-700',
        shaking && 'animate-hp-pulse-soft',
      )}
    >
      <CoinsIcon className="size-3 shrink-0" aria-hidden />
      {isEmpty ? (
        <span>{t('credits.topUp')}</span>
      ) : (
        <span>{displayed ?? balance}</span>
      )}
    </button>
  );
};
