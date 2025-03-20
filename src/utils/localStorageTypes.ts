import { FeatureFlags } from "@/consts/featureFlags";
import { Language } from "@/consts/languages";

export interface StorageData {
  language: Language;
  featureFlags: FeatureFlags;
}
