"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { Language, languages } from "@/consts/languages";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const { language, updateLanguage } = useLanguage();

  const handleLanguageChange = (language: Language) => {
    updateLanguage(language);
  };

  const languagesArray = Object.values(languages) as Language[];

  return (
    <footer className="w-full py-4 px-6 flex justify-between items-center border-t">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            {language.name} <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {languagesArray.map((language) => (
            <DropdownMenuItem
              key={language.code}
              onClick={() => handleLanguageChange(language)}
            >
              {language.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </footer>
  );
}
