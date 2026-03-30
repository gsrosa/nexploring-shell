interface AnalyticsEvent {
  name: string;
  properties?: Record<string, unknown>;
}

export const analytics = {
  track(event: AnalyticsEvent): void {
    if (import.meta.env.DEV) {
      console.debug('[Analytics]', event.name, event.properties);
    }
  },

  page(path: string): void {
    if (import.meta.env.DEV) {
      console.debug('[Analytics] Page view:', path);
    }
  },

  identify(userId: string, traits?: Record<string, unknown>): void {
    if (import.meta.env.DEV) {
      console.debug('[Analytics] Identify:', userId, traits);
    }
  },
};
