import React, { useState, useEffect, useRef } from "react";

import { Button } from "@/components/ui/button";
import SectionTitle from "./SectionTitle";
import { MAX_MOVES } from "@/consts/maxNumberOfMoves";
import { MovementType } from "@/consts/movementList";

export interface GeneratedMovementListProps {
  clearSelectedMoves: () => void;
  filteredMoves: MovementType[];
  numberOfMoves: number;
  selectedMoves: MovementType[];
  setNumberOfMoves: (value: number) => void;
  setSelectedMoves: (moves: MovementType[]) => void;
  toggleMoveSelection: (move: MovementType) => void;
}
export default function GeneratedMovementList({
  clearSelectedMoves,
  filteredMoves,
  numberOfMoves,
  selectedMoves,
  setNumberOfMoves,
  setSelectedMoves,
  toggleMoveSelection,
}: GeneratedMovementListProps) {
  const [selectedMovesHeight, setSelectedMovesHeight] = useState<number>(0);
  // const [numberOfMoves, setNumberOfMoves] = useState<number>(3);

  const addRandomMoves = () => {
    const shuffled = [...filteredMoves].sort(() => 0.5 - Math.random());
    setSelectedMoves([...shuffled.slice(0, numberOfMoves)]);
  };
  const selectedMovesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedMovesRef.current) {
      setSelectedMovesHeight(selectedMovesRef.current.scrollHeight);
    }
  }, [selectedMoves]);

  return (
    <section>
      <SectionTitle>Capoeira Moves</SectionTitle>
      <div className="mb-4 flex gap-2">
        <div className="flex items-center gap-2 w-2/3">
          <select
            value={numberOfMoves}
            onChange={(e) => setNumberOfMoves(Number(e.target.value))}
            className="p-2 border border-gray-300 rounded-md"
          >
            {Array(MAX_MOVES)
              .fill(0)
              .map((_, index) => (
                <option key={index + 1} value={index + 1}>
                  {index + 1}
                </option>
              ))}
          </select>
          <Button onClick={addRandomMoves} className="flex-grow">
            Generate Moves
          </Button>
        </div>
        <Button onClick={clearSelectedMoves} className="w-1/3">
          Clear
        </Button>
      </div>
      <div
        ref={selectedMovesRef}
        style={{
          height: selectedMoves.length > 0 ? selectedMovesHeight : 0,
          opacity: selectedMoves.length > 0 ? 1 : 0,
          overflow: "hidden",
          transition: "height 0.3s ease-out, opacity 0.3s ease-out",
        }}
      >
        {selectedMoves.length > 0 && (
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Selected Moves:</h3>
            <ul className="border border-gray-300 rounded-lg shadow-md p-4 flex flex-wrap gap-2 justify-start">
              {selectedMoves.map((move) => (
                <li key={move.name}>
                  <Button onClick={() => toggleMoveSelection(move)}>
                    {move.name}
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
