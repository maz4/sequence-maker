"use client";

import { Button } from "@/components/ui/button";
import {
  UpdateFeatureFalgArgs,
  useFeatureFlags,
} from "@/contexts/FeatureFlagsContext";
import { FeatureFlagKeys } from "@/consts/featureFlags";

export default function FeatureFlags() {
  const { featureFlags, updateFeatureFlag } = useFeatureFlags();

  const onChange = ({ flag, values }: UpdateFeatureFalgArgs): void => {
    if (!flag || !values) return;
    const newValues = {
      ...values,
      isEnabled: !values.isEnabled,
    };

    updateFeatureFlag({ flag, values: newValues });
  };

  return (
    <div className="p-3">
      <h1 className="text-3xl md:text-4xl font-bold mb-4">Feature Flags</h1>
      <ul>
        {(Object.keys(featureFlags) as FeatureFlagKeys[]).map((flag) => {
          return (
            <li className="flex flex-row gap-3 mb-2" key={flag}>
              <p>
                <strong>{flag}:</strong>
              </p>
              <p>Is enabled: {`${featureFlags[flag].isEnabled}`}</p>
              <Button
                onClick={() => onChange({ flag, values: featureFlags[flag] })}
                size="sm"
              >
                {`Change to ${featureFlags[flag].isEnabled}`}
              </Button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
