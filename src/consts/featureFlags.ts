export const flags = {
  header: {
    isEnabled: true,
    description: "",
  },
  footer: {
    isEnabled: false,
    description: "",
  },
} as const;

export type FeatureFlagValues = (typeof flags)[keyof typeof flags];

export type FeatureFlagKeys = keyof typeof flags;

export type FeatureFlags = {
  [K in FeatureFlagKeys]: FeatureFlagValues;
};
