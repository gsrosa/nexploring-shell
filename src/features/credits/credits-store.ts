import { create } from 'zustand';

type CreditsState = {
  balance: number | null;
  lastDeduction: { amount: number; timestamp: number } | null;
  purchaseModalOpen: boolean;
  setBalance: (balance: number) => void;
  optimisticDeduct: (amount: number) => void;
  refund: (amount: number) => void;
  setLastDeduction: (d: { amount: number; timestamp: number }) => void;
  openPurchaseModal: () => void;
  closePurchaseModal: () => void;
};

export const useCreditsStore = create<CreditsState>((set) => ({
  balance: null,
  lastDeduction: null,
  purchaseModalOpen: false,
  setBalance: (balance) => set({ balance }),
  optimisticDeduct: (amount) =>
    set((s) => ({ balance: s.balance != null ? Math.max(0, s.balance - amount) : s.balance })),
  refund: (amount) =>
    set((s) => ({ balance: s.balance != null ? s.balance + amount : s.balance })),
  setLastDeduction: (d) => set({ lastDeduction: d }),
  openPurchaseModal: () => set({ purchaseModalOpen: true }),
  closePurchaseModal: () => set({ purchaseModalOpen: false }),
}));

/** MFEs dispatch this after any credit-consuming action to sync the shell balance. */
export const dispatchCreditsUpdated = (): void => {
  window.dispatchEvent(new CustomEvent('atlas:credits-updated'));
};

/** MFEs dispatch this when balance is insufficient to open the PurchaseModal in the shell. */
export const dispatchOpenPurchaseModal = (): void => {
  window.dispatchEvent(new CustomEvent('atlas:open-purchase-modal'));
};
