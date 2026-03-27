interface ErrorContext {
  component?: string;
  action?: string;
  metadata?: Record<string, unknown>;
}

export const monitoring = {
  captureException(error: unknown, context?: ErrorContext): void {
    if (import.meta.env.DEV) {
      console.error('[Monitoring] Exception:', error, context);
    }
  },

  captureMessage(
    message: string,
    level: 'info' | 'warning' | 'error' = 'info',
  ): void {
    if (import.meta.env.DEV) {
      console.debug(`[Monitoring] ${level}:`, message);
    }
  },

  setUser(userId: string): void {
    if (import.meta.env.DEV) {
      console.debug('[Monitoring] Set user:', userId);
    }
  },
};
