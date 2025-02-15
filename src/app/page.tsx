import Hero from "@/components/Hero";
import MovesList from "@/components/MovesList";

export default function Home() {
  return (
    <div className="min-h-screen max-w-screen-xl mx-auto flex flex-col items-center px-2">
      <Hero />
      <MovesList />
    </div>
  );
}
