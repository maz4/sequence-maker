export const languages = {
  en: { name: "English", code: "en" },
  jp: { name: "日本語", code: "jp" },
  pt: { name: "Português", code: "pt" },
} as const;

// Type inferred from the languages object
export type Language = (typeof languages)[keyof typeof languages];

// Type for language keys (en, jp, pt)
export type LanguageKey = keyof typeof languages;
