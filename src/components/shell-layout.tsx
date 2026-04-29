'use client';

import type { ReactNode } from 'react';

import { TravelerProfileSync } from '@/features/traveler-profile/traveler-profile-sync';

import { BottomNav } from './nav/bottom-nav';
import { Footer } from './nav/footer';
import { PurchaseModal } from './nav/purchase-modal';
import { TopNav } from './nav/top-nav';

export const ShellLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-dvh flex-col bg-neutral-900 text-neutral-100">
      <TravelerProfileSync />
      <TopNav />
      <main className="flex min-h-0 flex-1 flex-col pb-[calc(60px+env(safe-area-inset-bottom,0px))] md:pb-0">
        <div className="flex min-h-0 flex-1 flex-col">{children}</div>
      </main>
      <Footer />
      <BottomNav />
      <PurchaseModal />
    </div>
  );
};
