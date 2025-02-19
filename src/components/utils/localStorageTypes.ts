import { Language } from "@/consts/languages";

export interface StorageData {
  userLanguage: Language;
  [key: string]: unknown;
}
