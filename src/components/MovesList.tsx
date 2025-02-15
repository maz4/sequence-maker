"use client";

import React, { useState } from "react";
import {
  capoeiraMovements,
  MovementType,
  moveTypes,
} from "@/consts/movementList";

export default function MovesList() {
  const [moveFilter, setMoveFilter] = useState<string>("all");

  const moveTypesFilterOptions = ["all", ...moveTypes];

  const filteredMoves = Object.values(capoeiraMovements).filter(
    (move) => moveFilter === "all" || move.moveType === moveFilter
  );

  return (
    <div className="mt-4 mb-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Capoeira Moves</h2>
      <div className="mb-4">
        <select
          value={moveFilter}
          onChange={(e) => setMoveFilter(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {moveTypesFilterOptions.map((type) => (
            <option key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </select>
      </div>
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
  );
}
