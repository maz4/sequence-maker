import React from "react";

import { Button } from "@/components/ui/button";
import SectionTitle from "./SectionTitle";
import { MovementType } from "@/consts/movementList";

export interface MovesListProps {
  filteredMoves: MovementType[];
  selectedMoves: MovementType[];
  toggleMoveSelection: (move: MovementType) => void;
}

export default function MovesList({
  filteredMoves,
  selectedMoves,
  toggleMoveSelection,
}: MovesListProps) {
  return (
    <section>
      <SectionTitle>Moves List: {filteredMoves.length}</SectionTitle>
      <div className="h-80 overflow-y-auto border border-gray-300 rounded-lg shadow-xl">
        <ul className="flex flex-col gap-2 p-4 min-w-80">
          {filteredMoves.map((move: MovementType) => (
            <li key={move.name}>
              <Button
                variant={
                  selectedMoves.some((m) => m.name === move.name)
                    ? "secondary"
                    : "custom"
                }
                size="full"
                onClick={() => toggleMoveSelection(move)}
              >
                {move.name}
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
