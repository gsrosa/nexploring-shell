import { Outlet } from 'react-router-dom';
import { BottomNav } from './bottom-nav';
import { Footer } from './footer';
import { TopNav } from './top-nav';

export function ShellLayout() {
  return (
    <div className="flex flex-col min-h-full bg-neutral-50 text-neutral-700">
      <TopNav />
      <main className="flex-1 overflow-y-auto pb-[calc(60px+env(safe-area-inset-bottom,0px))] md:pb-0">
        <Outlet />
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
}
