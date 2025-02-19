"use client";
import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { Language, languages } from "@/consts/languages";

interface LanguageContextType {
  language: Language;
  updateLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(languages.en);

  useEffect(() => {
    const storedLanguage = localStorage.getItem("language");
    if (storedLanguage) {
      const parsedLanguage = JSON.parse(storedLanguage);
      setLanguage(parsedLanguage);
    }
  }, []);

  const updateLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
    localStorage.setItem("language", JSON.stringify(newLanguage));
  };

  console.log(language);
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
