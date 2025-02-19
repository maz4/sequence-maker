"use client";

import Hero from "@/components/Hero/Hero";
import MovesGenerator from "@/components/MovesGenerator";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen max-w-screen-xl mx-auto flex flex-col items-center px-2">
      <Hero />
      <MovesGenerator />
      <Footer />
    </div>
  );
}
