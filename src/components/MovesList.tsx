import { capoeiraMovements, MovementType } from "@/consts/movementList";

export default function MovesList() {
  return (
    <div className="mt-4 mb-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Capoeira Moves</h2>
      <div className="h-80 overflow-y-auto border border-gray-300 rounded-lg shadow-xl">
        <ul className="space-y-3 p-4 max-w-2xl">
          {Object.values(capoeiraMovements).map((move: MovementType) => (
            <li key={move.name} className="w-full">
              <button className="w-full py-2 px-4 border border-gray-300 rounded-md text-left hover:text-gray-500 transition-colors duration-200 shadow-md">
                {move.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
