"use client";

import { Button } from "@/components/ui/button";
import { useFeatureFlags } from "@/contexts/FeatureFlagsContext";
import { FeatureFlagKeys, FeatureFlagValues } from "@/consts/featureFlags";

export default function FeatureFlags() {
  const { featureFlags, updateFeatureFlag } = useFeatureFlags();

  const onChange = (flag: FeatureFlagKeys, values: FeatureFlagValues): void => {
    const newValues = {
      ...values,
      isEnabled: !values.isEnabled,
    };

    updateFeatureFlag({ flag, values: newValues });
  };

  return (
    <div>
      <h1>Feature Flags</h1>
      <ul>
        {Object.keys(featureFlags).map((flag) => {
          return (
            <li key={flag}>
              <div>
                <p>{flag}</p>
                <p>enabled: {`${featureFlags[flag].isEnabled}`}</p>
                <Button onClick={() => onChange(flag, featureFlags[flag])}>
                  {`${featureFlags[flag].isEnabled}`}
                </Button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
