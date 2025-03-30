import type { AppProps } from "next/app";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { FeatureFlagsProvider } from "@/contexts/FeatureFlagsContext";
import "@/app/globals.css";

export default function PagesLayout({ Component, pageProps }: AppProps) {
  return (
    <FeatureFlagsProvider>
      <LanguageProvider>
        <Component {...pageProps} />
      </LanguageProvider>
    </FeatureFlagsProvider>
  );
}
