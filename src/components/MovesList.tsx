"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  capoeiraMovements,
  MovementType,
  moveTypes,
  jogoTypes,
} from "@/consts/movementList";

export default function MovesList() {
  const [moveFilter, setMoveFilter] = useState<string>("all");
  const [jogoFilter, setJogoFilter] = useState<
    (typeof jogoTypes)[number] | "all"
  >("all");
  const [randomMoves, setRandomMoves] = useState<MovementType[]>([]);
  const [randomMovesHeight, setRandomMovesHeight] = useState<number>(0);

  const randomMovesRef = useRef<HTMLDivElement>(null);

  const moveTypesFilerValues = ["all", ...moveTypes];
  const jogoTypesFilterValues = ["all", ...jogoTypes];

  useEffect(() => {
    if (randomMovesRef.current) {
      setRandomMovesHeight(randomMovesRef.current.scrollHeight);
    }
  }, [randomMoves]);

  const filteredMoves = Object.values(capoeiraMovements).filter(
    (move) =>
      (moveFilter === "all" || move.moveType === moveFilter) &&
      (jogoFilter === "all" || move.jogoType.includes(jogoFilter))
  );

  const pickRandomMoves = () => {
    const shuffled = [...filteredMoves].sort(() => 0.5 - Math.random());
    setRandomMoves(shuffled.slice(0, 3));
  };

  return (
    <div className="mt-4 mb-4 flex flex-col justify-center">
      <h2 className="text-2xl font-bold mb-4 text-center">Capoeira Moves</h2>
      <div className="mb-4 flex gap-2">
        <button
          onClick={pickRandomMoves}
          className="w-2/3 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
        >
          Pick 3 Random Moves
        </button>
        <button
          onClick={() => setRandomMoves([])}
          className="w-1/3 py-2 px-4 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors duration-200"
        >
          Clear
        </button>
      </div>
      <div
        ref={randomMovesRef}
        style={{
          height: randomMoves.length > 0 ? randomMovesHeight : 0,
          opacity: randomMoves.length > 0 ? 1 : 0,
          overflow: "hidden",
          transition: "height 0.3s ease-out, opacity 0.3s ease-out",
        }}
      >
        {randomMoves.length > 0 && (
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Random Moves:</h3>
            <ul className="border border-gray-300 rounded-lg shadow-md p-4 flex flex-col md:flex-row gap-2 justify-between">
              {randomMoves.map((move) => (
                <li
                  key={move.name}
                  className="w-full py-2 px-4 border border-gray-300 mt-0 rounded-md text-left hover:text-gray-500 transition-colors shadow-md content-center"
                >
                  {move.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="max-w-80 mx-auto">
        <div className="mb-4 flex flex-col">
          <div className="flex flex-wrap justify-center gap-2">
            <div className="w-full">
              <label
                htmlFor="moveFilter"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Move Type
              </label>
              <select
                id="moveFilter"
                value={moveFilter}
                onChange={(e) => setMoveFilter(e.target.value)}
                className="capitalize w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {moveTypesFilerValues.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full">
              <label
                htmlFor="jogoFilter"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Jogo Type
              </label>
              <select
                id="jogoFilter"
                value={jogoFilter}
                onChange={(e) =>
                  setJogoFilter(e.target.value as (typeof jogoTypes)[number])
                }
                className="capitalize w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {jogoTypesFilterValues.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <p>Move Types: {filteredMoves.length}</p>
        <div className="h-80 overflow-y-auto border border-gray-300 rounded-lg shadow-xl">
          <ul className="space-y-3 p-4 min-w-80">
            {filteredMoves.map((move: MovementType) => (
              <li key={move.name} className="w-full">
                <button className="w-full py-2 px-4 border border-gray-300 rounded-md text-left hover:text-gray-500 transition-colors duration-200 shadow-md">
                  {move.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
