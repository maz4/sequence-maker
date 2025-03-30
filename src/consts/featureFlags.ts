export const flags = {
  header: {
    isEnabled: true,
    description: "Enable new header design",
  },
  footer: {
    isEnabled: false,
    description: "enable new fotter design",
  },
} as const;

export type FeatureFlagValues = { isEnabled: boolean; description: string };

export type FeatureFlagKeys = keyof typeof flags;

export type FeatureFlags = {
  [K in FeatureFlagKeys]: FeatureFlagValues;
};
