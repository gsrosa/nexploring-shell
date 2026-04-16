type FeatureFlags = {
  enableSearchApp: boolean;
  enableAIAssistant: boolean;
  /** atlas-user MFE (Module Federation `userApp`) */
  enableUserApp: boolean;
  /** atlas-payment MFE (Module Federation `paymentApp`) */
  enablePaymentApp: boolean;
};

export type FeatureFlagKey = keyof FeatureFlags;

const flags: FeatureFlags = {
  enableSearchApp: true,
  enableAIAssistant: true,
  enableUserApp: true,
  enablePaymentApp: true,
};

export const isFeatureEnabled = (flag: FeatureFlagKey): boolean => {
  return flags[flag];
};

export const getFeatureFlags = (): Readonly<FeatureFlags> => {
  return Object.freeze({ ...flags });
};
