"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { saveToStorage, getItemFromStorage } from "@/utils/localStorage";
import {
  FeatureFlags,
  FeatureFlagKeys,
  flags,
  FeatureFlagValues,
} from "@/consts/featureFlags";

/**
 * Feature flags context profivder is wrapper for a whole app
 * It allows to read the feature flags, update them and keep them in the local sotrage.
 * These are code first freature flags. This means they need to be defined first
 * in the code in the @see /consts/featureFlags.ts
 *
 * To add new feature flag you need to add in the /consts/featureFlags.ts file
 * And then you can use it in the code.
 */

/** local storage key */
const FEATURE_FLAGS = "featureFlags";

type UpdateFeatureFalgArgs = {
  flag: FeatureFlagKeys;
  values: FeatureFlagValues;
};

interface FeatureFlagsContextType {
  featureFlags: FeatureFlags;
  updateFeatureFlag: ({ flag, values }: UpdateFeatureFalgArgs) => void;
}

const FeatureFlagsContext = createContext<FeatureFlagsContextType | undefined>(
  undefined
);

export const FeatureFlagsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [featureFlags, setFeatureFlags] = useState<FeatureFlags>(flags);

  /**
   * @param flag - feature falg key
   * @param value - data that is saved for the flag
   */
  const updateFeatureFlag = ({ flag, values }: UpdateFeatureFalgArgs) => {
    setFeatureFlags((prev) => {
      const newFlags = { ...prev, [flag]: values };

      saveToStorage(FEATURE_FLAGS, newFlags);
      return newFlags;
    });
  };

  useEffect(() => {
    const storedFlags = getItemFromStorage(FEATURE_FLAGS);

    if (!storedFlags) {
      setFeatureFlags(flags);
      saveToStorage(FEATURE_FLAGS, flags);
      return;
    }

    if (storedFlags) {
      setFeatureFlags(storedFlags);
    }
  }, []);

  return (
    <FeatureFlagsContext.Provider value={{ featureFlags, updateFeatureFlag }}>
      {children}
    </FeatureFlagsContext.Provider>
  );
};

export const useFeatureFlags = () => {
  const context = useContext(FeatureFlagsContext);
  if (!context) {
    throw new Error(
      "useFeatureFlags must be used within a FeatureFlagsProvider"
    );
  }
  return context;
};
