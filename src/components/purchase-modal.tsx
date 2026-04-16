import React from 'react';

import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  cn,
} from '@gsrosa/atlas-ui';
import { CheckIcon, CoinsIcon } from 'lucide-react';
import { toast } from 'sonner';

import { useCreditsStore } from '@/features/credits/credits-store';
import { CREDIT_BUNDLES, type CreditBundle } from '@/shared/constants/credits';
import { trpc } from '@/lib/trpc';

export const PurchaseModal = () => {
  const isOpen = useCreditsStore((s) => s.purchaseModalOpen);
  const closePurchaseModal = useCreditsStore((s) => s.closePurchaseModal);
  const balance = useCreditsStore((s) => s.balance);

  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  const [successId, setSuccessId] = React.useState<string | null>(null);

  const addFunds = trpc.credits.addFunds.useMutation({
    onSuccess: (data) => {
      useCreditsStore.getState().setBalance(data.balance);
      const bundle = CREDIT_BUNDLES.find((b) => b.id === selectedId);
      if (bundle) {
        setSuccessId(bundle.id);
        toast.success(`${bundle.credits} credits added!`);
        setTimeout(() => {
          setSuccessId(null);
          setSelectedId(null);
          closePurchaseModal();
        }, 1500);
      }
    },
    onError: (err) => {
      toast.error(err.message);
      setSelectedId(null);
    },
  });

  const handleSelect = (bundle: CreditBundle) => {
    if (addFunds.isPending) return;
    setSelectedId(bundle.id);
    addFunds.mutate({ amount: bundle.credits, reason: 'purchase' });
  };

  const handleClose = () => {
    if (addFunds.isPending) return;
    setSelectedId(null);
    closePurchaseModal();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) handleClose(); }}>
      <DialogContent className="w-full max-w-md">
        <DialogHeader>
          <DialogTitle>Get more credits</DialogTitle>
          {balance != null && (
            <p className="text-sm text-neutral-400">
              You have <span className="font-semibold text-neutral-100">{balance}</span> credits
            </p>
          )}
        </DialogHeader>

        <div className="mt-4 grid gap-3">
          {CREDIT_BUNDLES.map((bundle) => {
            const isProcessing = addFunds.isPending && selectedId === bundle.id;
            const isSuccess = successId === bundle.id;
            const isDimmed = addFunds.isPending && selectedId !== bundle.id;

            return (
              <button
                key={bundle.id}
                type="button"
                onClick={() => handleSelect(bundle)}
                disabled={addFunds.isPending}
                className={cn(
                  'relative flex items-center justify-between rounded-xl border p-4 text-left transition-all',
                  bundle.highlight
                    ? 'border-primary-500/50 bg-primary-500/10 hover:bg-primary-500/15'
                    : 'border-neutral-700 bg-neutral-800 hover:bg-neutral-700',
                  isDimmed && 'opacity-40',
                  isSuccess && 'border-success-500/50 bg-success-500/10',
                )}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-neutral-100">{bundle.label}</span>
                    {bundle.highlight && (
                      <span className="rounded-full bg-primary-500/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary-400">
                        Popular
                      </span>
                    )}
                  </div>
                  <div className="mt-0.5 flex items-baseline gap-1.5">
                    <CoinsIcon className="size-3 text-neutral-400" aria-hidden />
                    <span className="text-sm text-neutral-300">
                      {bundle.credits} credits
                    </span>
                    <span className="text-xs text-neutral-500">· {bundle.description}</span>
                  </div>
                </div>

                <div className="shrink-0 text-right">
                  {isSuccess ? (
                    <CheckIcon className="size-5 text-success-400" aria-hidden />
                  ) : isProcessing ? (
                    <div className="size-5 animate-spin rounded-full border-2 border-primary-400 border-t-transparent" />
                  ) : (
                    <span className="text-sm font-semibold text-neutral-100">
                      ${(bundle.priceCents / 100).toFixed(2)}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        <p className="mt-4 text-center text-[11px] text-neutral-500">
          Credits never expire. No subscription.
        </p>

        <div className="mt-2 flex justify-end">
          <Button variant="ghost" size="sm" onClick={handleClose} disabled={addFunds.isPending}>
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
