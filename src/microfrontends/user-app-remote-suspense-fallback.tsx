import { useLocation } from 'react-router-dom';

const resolveUserAppSkeletonRoute = (pathname: string) => {
  if (/^\/profile\/onboarding\/?$/.test(pathname)) return 'onboarding';
  if (/^\/my-trips\/([\w-]+)$/.test(pathname)) return 'trip-detail';
  if (/^\/my-trips\/?$/.test(pathname)) return 'trips-list';
  if (pathname === '/profile' || /^\/profile\/settings\/?$/.test(pathname)) return 'profile';
  return 'profile';
};

const TripsListPageSkeletonShell = () => (
  <div className="account-user-root relative flex min-h-[calc(100dvh-60px)] w-full min-w-0 flex-col overflow-hidden bg-surface text-neutral-100 md:min-h-screen">
    <div className="relative z-1 flex min-h-[calc(100dvh-60px)] w-full min-w-0 flex-1 flex-col md:min-h-screen">
      <div className="mx-auto w-full max-w-2xl space-y-8 px-4 py-10 sm:px-6">
        <div className="flex items-center justify-between">
          <div className="h-7 w-24 animate-pulse rounded-lg bg-neutral-700" />
          <div className="h-9 w-28 animate-pulse rounded-xl bg-neutral-700" />
        </div>
        <ul className="space-y-3">
          {[0, 1, 2, 3].map((i) => (
            <li
              key={i}
              className="rounded-2xl border border-neutral-700 bg-neutral-800 p-5"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="flex items-center gap-4">
                <div className="size-12 shrink-0 animate-pulse rounded-xl bg-neutral-700" />
                <div className="min-w-0 flex-1 space-y-2.5">
                  <div className="space-y-1.5">
                    <div
                      className="h-4 animate-pulse rounded bg-neutral-700"
                      style={{ width: `${55 + (i % 3) * 12}%`, animationDelay: `${i * 60}ms` }}
                    />
                    <div
                      className="h-3 w-24 animate-pulse rounded bg-neutral-700/70"
                      style={{ animationDelay: `${i * 60 + 30}ms` }}
                    />
                  </div>
                  <div className="flex gap-3">
                    <div className="h-5 w-16 animate-pulse rounded-full bg-neutral-700/70" />
                    <div className="h-5 w-20 animate-pulse rounded-full bg-neutral-700/70" />
                    <div className="h-5 w-14 animate-pulse rounded-full bg-neutral-700/70" />
                  </div>
                </div>
                <div className="size-4 shrink-0 animate-pulse rounded bg-neutral-700" />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

const DayStepShell = ({ index, isLast }: { index: number; isLast: boolean }) => (
  <div className="flex gap-4">
    <div className="flex flex-col items-center">
      <div
        className="flex size-8 shrink-0 animate-pulse items-center justify-center rounded-full bg-neutral-700"
        style={{ animationDelay: `${index * 80}ms` }}
      />
      {!isLast && <div className="mt-1 w-px flex-1 bg-neutral-700/60" />}
    </div>
    <div className="min-w-0 flex-1 pb-8">
      <div className="flex items-baseline gap-2 pb-3">
        <div
          className="h-3.5 w-28 animate-pulse rounded bg-neutral-700"
          style={{ animationDelay: `${index * 80}ms` }}
        />
        <div
          className="h-3 w-20 animate-pulse rounded bg-neutral-700/60"
          style={{ animationDelay: `${index * 80 + 20}ms` }}
        />
      </div>
      <div className="space-y-2.5">
        {[0, 1, 2].map((j) => (
          <div key={j} className="flex items-start gap-2.5">
            <div
              className="mt-1.5 size-1.5 shrink-0 animate-pulse rounded-full bg-neutral-600"
              style={{ animationDelay: `${index * 80 + j * 25}ms` }}
            />
            <div className="flex-1 space-y-1">
              <div
                className="h-3.5 animate-pulse rounded bg-neutral-700"
                style={{
                  width: `${50 + ((index + j) % 4) * 10}%`,
                  animationDelay: `${index * 80 + j * 25}ms`,
                }}
              />
              <div
                className="h-3 w-24 animate-pulse rounded bg-neutral-700/60"
                style={{ animationDelay: `${index * 80 + j * 25 + 15}ms` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const TripDetailPageSkeletonShell = () => (
  <div className="account-user-root relative flex min-h-[calc(100dvh-60px)] w-full min-w-0 flex-col overflow-hidden bg-surface text-neutral-100 md:min-h-screen">
    <div className="relative z-1 flex min-h-[calc(100dvh-60px)] w-full min-w-0 flex-1 flex-col md:min-h-screen">
      <div className="mx-auto w-full max-w-2xl px-4 py-8 sm:px-6">
        <div className="mb-8 flex items-start justify-between gap-4">
          <div className="h-4 w-20 animate-pulse rounded bg-neutral-700" />
          <div className="h-8 w-24 animate-pulse rounded-xl bg-neutral-700" />
        </div>
        <div className="mb-6 space-y-2">
          <div className="h-7 w-56 animate-pulse rounded-lg bg-neutral-700" />
          <div className="h-4 w-32 animate-pulse rounded bg-neutral-700/70" />
        </div>
        <div className="mb-4 flex flex-wrap gap-2">
          {[40, 56, 48, 36].map((w, i) => (
            <div
              key={i}
              className="h-6 animate-pulse rounded-full bg-neutral-700"
              style={{ width: `${w * 4}px`, animationDelay: `${i * 40}ms` }}
            />
          ))}
        </div>
        <div className="mb-8 flex gap-3">
          <div className="h-7 w-32 animate-pulse rounded-full border border-neutral-700 bg-neutral-800" />
          <div className="h-7 w-28 animate-pulse rounded-full border border-neutral-700 bg-neutral-800" />
        </div>
        <div>
          {[0, 1, 2, 3].map((i) => (
            <DayStepShell key={i} index={i} isLast={i === 3} />
          ))}
        </div>
      </div>
    </div>
  </div>
);

const NAV_PLACEHOLDERS = [0, 1, 2, 3];
const SECTION_ROW_COUNTS = [4, 3, 4];

const TravelerProfileSettingsPageSkeletonShell = () => (
  <div className="account-user-root relative flex min-h-[calc(100dvh-60px)] w-full min-w-0 flex-col overflow-hidden bg-surface text-neutral-100 md:min-h-screen">
    <div className="relative z-1 flex min-h-[calc(100dvh-60px)] w-full min-w-0 flex-1 flex-col md:min-h-screen">
      <div className="flex min-h-0 w-full flex-1 flex-col items-stretch px-3 py-4 sm:px-5 sm:py-6 md:px-6 md:py-8">
        <div className="mx-auto flex min-h-0 w-full max-w-5xl flex-1 flex-col overflow-hidden rounded-2xl border border-neutral-700 bg-neutral-800 shadow-(--atlas-shadow-lg) md:min-h-[min(780px,calc(100dvh-7rem))]">
          <div className="flex shrink-0 items-center gap-3 border-b border-neutral-700 bg-neutral-800 px-3 py-3 md:hidden">
            <div className="size-10 shrink-0 animate-pulse rounded-lg bg-neutral-700" />
            <div className="flex min-w-0 flex-1 flex-col items-center gap-1">
              <div className="h-2.5 w-14 animate-pulse rounded bg-neutral-700" />
              <div className="h-3.5 w-24 animate-pulse rounded bg-neutral-700" />
            </div>
            <div className="size-10 shrink-0" />
          </div>
          <div className="flex min-h-0 flex-1 flex-col md:flex-row md:items-stretch">
            <div className="hidden w-56 shrink-0 border-r border-neutral-700 bg-neutral-800 md:flex md:flex-col md:self-stretch">
              <div className="px-3 py-5 md:px-4 md:py-6">
                <div className="mb-3 ml-2 h-2.5 w-14 animate-pulse rounded bg-neutral-700" />
                <nav className="flex flex-col gap-1">
                  {NAV_PLACEHOLDERS.map((i) => (
                    <div key={i} className="flex items-center gap-3 rounded-lg px-3 py-2.5">
                      <div
                        className="size-4 animate-pulse rounded bg-neutral-700"
                        style={{ animationDelay: `${i * 40}ms` }}
                      />
                      <div
                        className="h-3.5 w-20 animate-pulse rounded bg-neutral-700"
                        style={{ animationDelay: `${i * 40}ms` }}
                      />
                    </div>
                  ))}
                </nav>
              </div>
            </div>
            <main className="min-h-0 min-w-0 flex-1 overflow-y-auto px-4 py-6 sm:px-6 md:px-10 md:py-10">
              <div className="space-y-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1.5">
                    <div className="h-6 w-40 animate-pulse rounded-lg bg-neutral-700" />
                    <div className="h-3.5 w-64 animate-pulse rounded bg-neutral-700/70" />
                  </div>
                  <div className="h-8 w-16 animate-pulse rounded-lg bg-neutral-700" />
                </div>
                <div className="space-y-4">
                  {SECTION_ROW_COUNTS.map((rowCount, si) => (
                    <div
                      key={si}
                      className="rounded-2xl border border-neutral-700 bg-neutral-800 px-5 py-4 sm:px-6"
                      style={{ animationDelay: `${si * 60}ms` }}
                    >
                      <div
                        className="mb-3 h-2.5 w-20 animate-pulse rounded bg-neutral-700"
                        style={{ animationDelay: `${si * 60}ms` }}
                      />
                      <div className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
                        {Array.from({ length: rowCount }).map((_, ri) => (
                          <div key={ri} className="flex items-center justify-between gap-3">
                            <div
                              className="h-3 w-20 animate-pulse rounded bg-neutral-700/70"
                              style={{ animationDelay: `${si * 60 + ri * 30}ms` }}
                            />
                            <div
                              className="h-6 w-20 animate-pulse rounded-full bg-neutral-700"
                              style={{ animationDelay: `${si * 60 + ri * 30 + 15}ms` }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const TravelerProfileFormPageSkeletonShell = () => (
  <div className="flex min-h-dvh flex-col bg-neutral-900 text-neutral-100">
    <header className="sticky top-0 z-50 border-b border-neutral-800/20 bg-neutral-900/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-2xl items-center justify-between px-6 py-4">
        <div className="h-4 w-14 animate-pulse rounded bg-neutral-700" />
        <div className="h-3 w-28 animate-pulse rounded bg-neutral-700" />
        <div className="h-3 w-16 animate-pulse rounded bg-neutral-700" />
      </div>
      <div className="h-0.5 bg-neutral-700">
        <div className="h-full w-1/3 animate-pulse bg-primary-500/60" />
      </div>
    </header>
    <main className="flex flex-1 flex-col items-center px-6 pb-16 pt-12">
      <div className="w-full max-w-2xl">
        <div className="mb-10 flex flex-col items-center space-y-3 text-center">
          <div className="size-14 animate-pulse rounded-2xl bg-neutral-700" />
          <div className="h-8 w-48 animate-pulse rounded-lg bg-neutral-700 sm:w-64" />
          <div className="h-4 w-full max-w-sm animate-pulse rounded bg-neutral-700/70" />
        </div>
        <div className="space-y-8">
          {[0, 1].map((i) => (
            <div key={i} className="space-y-3" style={{ animationDelay: `${i * 80}ms` }}>
              <div className="h-3.5 w-32 animate-pulse rounded bg-neutral-700" />
              <div className="h-11 w-full animate-pulse rounded-xl bg-neutral-800" />
            </div>
          ))}
        </div>
        <div className="mt-10 flex justify-end">
          <div className="h-11 w-36 animate-pulse rounded-xl bg-neutral-700" />
        </div>
      </div>
    </main>
  </div>
);

/** Shown inside Suspense while the `userApp/Skeleton` chunk loads — mirrors remote skeleton layouts. */
export const UserAppRemoteSuspenseFallback = () => {
  const { pathname } = useLocation();
  const route = resolveUserAppSkeletonRoute(pathname);

  if (route === 'onboarding') return <TravelerProfileFormPageSkeletonShell />;
  if (route === 'trip-detail') return <TripDetailPageSkeletonShell />;
  if (route === 'trips-list') return <TripsListPageSkeletonShell />;
  return <TravelerProfileSettingsPageSkeletonShell />;
};
