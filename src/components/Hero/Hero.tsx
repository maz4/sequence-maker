"use client";
import { useLanguage } from "@/contexts/LanguageContext";
import AuBatido from "../svgs/AuBatido";
import { content } from "./heroContent";

export default function Hero() {
  const { language } = useLanguage();
  return (
    <main className="container mx-auto px-4 py-4">
      <div className="flex flex-col md:items-center md:space-x-8 text-center md:text-justify">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Capoeira Sequence Maker
        </h1>
        <div className="flex justify-center w-full md:w-1/2 mb-8 md:mb-0">
          <AuBatido />
        </div>
        <div className="w-full md:w-1/2">
          <p className="text-lg">{content[language.code].description}</p>
        </div>
      </div>
    </main>
  );
}
