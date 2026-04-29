'use client';

import dynamic from 'next/dynamic';

const MyTripsSection = dynamic(() => import('./_trip-detail-section'), {
  ssr: false,
  loading: () => (
    <div className="min-h-[calc(100dvh-60px)] animate-pulse bg-neutral-800/40 md:min-h-screen" />
  ),
});

export default function MyTripsPage() {
  return <MyTripsSection />;
}
