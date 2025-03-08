"use client";
import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { Language, languages } from "@/consts/languages";
import { getItemFromStorage, saveToStorage } from "@/utils/localStorage";

interface LanguageContextType {
  language: Language;
  updateLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(languages.en);

  const updateLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
    saveToStorage("language", newLanguage);
  };

  useEffect(() => {
    const storedLanguage = getItemFromStorage("language") as Language;

    /**
     * In case data in the local storage has corraped language set the laguage again to default
     */
    if (!languages[storedLanguage?.code]) {
      updateLanguage(languages.en);
      return;
    }

    /**
     * Set the language to the one that was found in the local storage
     */
    if (storedLanguage) {
      setLanguage(storedLanguage);
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ language, updateLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
