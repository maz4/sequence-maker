import AuBatido from "./svgs/AuBatido";

export default function Hero() {
  return (
    <main className="container mx-auto px-4 py-4">
      <div className="flex flex-col md:flex-row md:items-center md:space-x-8 text-center md:text-justify">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Sequence Capoeira Movements
        </h1>
        <div className="flex justify-center w-full md:w-1/2 mb-8 md:mb-0">
          <AuBatido />
        </div>
        <div className="w-full md:w-1/2">
          <p className="text-lg">
            Explore the dynamic world of Capoeira with capoeira random movement
            generator.
          </p>
        </div>
      </div>
    </main>
  );
}
