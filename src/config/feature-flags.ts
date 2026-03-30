interface FeatureFlags {
  enableSearchApp: boolean;
  enableAIAssistant: boolean;
  /** atlas-user MFE (Module Federation `userApp`) */
  enableUserApp: boolean;
}

export type FeatureFlagKey = keyof FeatureFlags;

const flags: FeatureFlags = {
  enableSearchApp: true,
  enableAIAssistant: true,
  enableUserApp: true,
};

export function isFeatureEnabled(flag: FeatureFlagKey): boolean {
  return flags[flag];
}

export function getFeatureFlags(): Readonly<FeatureFlags> {
  return Object.freeze({ ...flags });
}
