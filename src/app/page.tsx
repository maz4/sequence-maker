import AuBatido from "@/components/svgs/AuBatido";

export default function Home() {
  return (
    <div className="min-h-screen max-w-screen-xl mx-auto">
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:space-x-8">
          <div className="flex justify-center w-full md:w-1/2 mb-8 md:mb-0">
            <AuBatido />
          </div>
          <div className="w-full md:w-1/2">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Sequence Capoeira Movements
            </h1>
            <p className="text-lg mb-8">
              Explore the dynamic world of Capoeira with our random movement
              selector. Enhance your training and expand your repertoire with
              just a click.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
