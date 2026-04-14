import { Alert, AlertDescription, AlertTitle, Button } from '@gsrosa/atlas-ui';
import { AlertTriangle } from 'lucide-react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { useAuthUiStore } from '@/features/auth/auth-ui-store';
import { useSession } from '@/features/auth/use-session';
import { ROUTES } from '@/shared/constants/shell-routes';

interface Props {
  remoteLabel: string;
  children: ReactNode;
  loadingFallback?: ReactNode;
}

function AuthErrorScreen({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  const openLogin = useAuthUiStore((s) => s.openLogin);

  return (
    <div
      className="flex min-h-[min(70vh,560px)] flex-col items-center justify-center px-4 py-12 sm:px-6"
      role="alert"
      aria-live="polite"
    >
      <div className="w-full max-w-md">
        <Alert variant="danger" className="flex flex-col gap-3 border text-left sm:flex-row sm:items-start">
          <AlertTriangle
            className="size-10 shrink-0 text-[var(--atlas-color-danger-600)] sm:size-9"
            aria-hidden
            strokeWidth={2}
          />
          <div className="min-w-0 flex-1 space-y-2">
            <AlertTitle className="text-base text-[var(--atlas-color-danger-800)]">{title}</AlertTitle>
            <AlertDescription className="text-[var(--atlas-color-danger-700)]">{description}</AlertDescription>
            <p className="m-0 pt-1 font-mono text-xs text-[var(--atlas-color-danger-600)] opacity-90">
              Error · authentication required
            </p>
          </div>
        </Alert>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4">
          <Button type="button" variant="secondary" className="w-full sm:w-auto" asChild>
            <Link to={ROUTES.HOME} className="no-underline">
              Back to home
            </Link>
          </Button>
          <Button type="button" variant="ghost" className="w-full sm:w-auto" onClick={openLogin}>
            Sign in
          </Button>
        </div>
      </div>
    </div>
  );
}

export function AuthRemoteGate({ remoteLabel, children, loadingFallback }: Props) {
  const { isAuthenticated, isLoading, isUnauthorized } = useSession();

  if (isLoading) {
    return loadingFallback ?? (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-3 px-6 text-sm text-neutral-500">
        <span className="inline-block size-8 animate-spin rounded-full border-2 border-neutral-200 border-t-primary-400" />
        Checking your session…
      </div>
    );
  }

  if (!isAuthenticated && isUnauthorized) {
    return (
      <AuthErrorScreen
        title="Access denied"
        description={`You must be signed in to open ${remoteLabel}. This area is only available with an active Atlas session.`}
      />
    );
  }

  if (!isAuthenticated) {
    return (
      <AuthErrorScreen
        title="Session error"
        description="We could not verify your account. Try signing in again, or return to the home page."
      />
    );
  }

  return children;
}
