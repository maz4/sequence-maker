import Hero from "@/components/Hero";
import MovesGenerator from "@/components/MovesGenerator";

export default function Home() {
  return (
    <div className="min-h-screen max-w-screen-xl mx-auto flex flex-col items-center px-2">
      <Hero />
      <MovesGenerator />
    </div>
  );
}
