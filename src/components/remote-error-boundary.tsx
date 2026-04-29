'use client';

import React from 'react';

import { TriangleAlert } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { monitoring } from '@/shared/services/monitoring';

type Props = {
  remoteName: string;
  children: React.ReactNode;
};

type State = {
  hasError: boolean;
  error: Error | null;
};

function RemoteErrorContent({ onRetry }: { onRetry: () => void }) {
  const { t } = useTranslation('common');
  return (
    <div
      className="min-h-[calc(100vh-50px)] flex flex-col items-center justify-center gap-5 px-6 py-12 text-center bg-neutral-900 text-neutral-100"
      role="alert"
    >
      <div className="flex items-center justify-center w-14 h-14 rounded-full bg-neutral-800 text-primary-400">
        <TriangleAlert size={28} strokeWidth={1.5} />
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-base font-semibold m-0">
          {t('error.remoteTitle')}
        </h2>
        <p className="text-sm text-neutral-400 max-w-xs m-0">
          {t('error.remoteBody')}
        </p>
      </div>
      <button
        type="button"
        onClick={onRetry}
        className="rounded-xl bg-primary-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-600 cursor-pointer border-none"
      >
        {t('error.tryAgain')}
      </button>
    </div>
  );
}

/** React requires class components for error boundaries — this is the one allowed exception. */
export class RemoteErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo): void {
    monitoring.captureException(error, {
      component: 'RemoteErrorBoundary',
      action: `loading ${this.props.remoteName}`,
      metadata: { componentStack: info.componentStack },
    });
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return <RemoteErrorContent onRetry={this.handleRetry} />;
    }

    return this.props.children;
  }
}
