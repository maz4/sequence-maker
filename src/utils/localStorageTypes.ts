import { Language } from "@/consts/languages";

export interface StorageData {
  language: Language;
  [key: string]: unknown;
}
