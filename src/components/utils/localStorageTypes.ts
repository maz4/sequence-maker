import { LanguageType } from "@/consts/languages";

export interface StorageData {
  userLanguage: LanguageType;
  [key: string]: unknown;
}
