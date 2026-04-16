import { Outlet, ScrollRestoration } from 'react-router-dom';

import { TravelerProfileSync } from '@/features/traveler-profile/traveler-profile-sync';

import { BottomNav } from './bottom-nav';
import { Footer } from './footer';
import { PurchaseModal } from './purchase-modal';
import { TopNav } from './top-nav';

export const ShellLayout = () => {
  return (
    <div className="flex min-h-dvh flex-col bg-neutral-900 text-neutral-100">
      <TravelerProfileSync />
      <TopNav />
      <main className="flex min-h-0 flex-1 flex-col pb-[calc(60px+env(safe-area-inset-bottom,0px))] md:pb-0">
        <ScrollRestoration />
        <div className="flex min-h-0 flex-1 flex-col">
          <Outlet />
        </div>
      </main>
      <Footer />
      <BottomNav />
      <PurchaseModal />
    </div>
  );
};
