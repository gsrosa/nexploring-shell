'use client';

import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@gsrosa/nexploring-ui';
import { CoinsIcon, PlusIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { useCreditsStore } from '@/features/credits/credits-store';

import { ROUTES } from '@/shared/constants/shell-routes';

export const PurchaseModal = () => {
  const { t } = useTranslation(['common', 'payment']);
  const isOpen = useCreditsStore((s) => s.purchaseModalOpen);
  const closePurchaseModal = useCreditsStore((s) => s.closePurchaseModal);
  const balance = useCreditsStore((s) => s.balance);

  const handleGetCredits = () => {
    closePurchaseModal();
    window.location.assign(ROUTES.ADD_CREDITS);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) closePurchaseModal(); }}>
      <DialogContent className="w-full max-w-sm text-center">
        <DialogHeader>
          <div className="mx-auto mb-2 flex size-12 items-center justify-center rounded-full bg-primary-500/15">
            <CoinsIcon className="size-6 text-primary-400" aria-hidden />
          </div>
          <DialogTitle>{t('purchase.title')}</DialogTitle>
          {balance != null && (
            <p className="text-sm text-neutral-400">
              {t('purchase.currentBalance', { count: balance ?? 0 })}
            </p>
          )}
        </DialogHeader>

        <p className="mt-2 text-sm text-neutral-400">
          {t('purchase.body')}
        </p>

        <div className="mt-6 flex flex-col gap-2">
          <Button
            type="button"
            variant="primary"
            className="w-full gap-2 rounded-full font-semibold"
            onClick={handleGetCredits}
          >
            <PlusIcon className="size-4" aria-hidden />
            {t('action.getCredits')}
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="w-full"
            onClick={closePurchaseModal}
          >
            {t('action.maybeLater')}
          </Button>
        </div>

        <p className="mt-4 text-center text-[11px] text-neutral-500">
          {t('credits.noExpiry', { ns: 'payment' })}
        </p>
      </DialogContent>
    </Dialog>
  );
};
