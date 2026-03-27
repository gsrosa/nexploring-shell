interface FeatureFlags {
  enableSearchApp: boolean;
  enableAIAssistant: boolean;
}

export type FeatureFlagKey = keyof FeatureFlags;

const flags: FeatureFlags = {
  enableSearchApp: true,
  enableAIAssistant: true,
};

export function isFeatureEnabled(flag: FeatureFlagKey): boolean {
  return flags[flag];
}

export function getFeatureFlags(): Readonly<FeatureFlags> {
  return Object.freeze({ ...flags });
}
