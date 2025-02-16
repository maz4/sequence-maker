"use client";

import React, { useState } from "react";
import {
  capoeiraMovements,
  MovementType,
  JogoType,
} from "@/consts/movementList";

import MovementsFilter from "./MovementsFilter";
import GeneratedMovementList from "./GeneraedMovementList";
import MovesList from "./MovesList";

export default function MovnsGenerator() {
  const [selectedMoveTypes, setSelectedMoveTypes] = useState<string[]>([]);
  const [selectedJogoTypes, setSelectedJogoTypes] = useState<JogoType[]>([]);
  const [selectedMoves, setSelectedMoves] = useState<MovementType[]>([]);
  const [numberOfMoves, setNumberOfMoves] = useState<number>(3);

  const filteredMoves = Object.values(capoeiraMovements).filter(
    (move) =>
      (selectedMoveTypes.length === 0 ||
        selectedMoveTypes.includes(move.moveType)) &&
      (selectedJogoTypes.length === 0 ||
        selectedJogoTypes.some((jogo) => move.jogoType.includes(jogo)))
  );

  const clearSelectedMoves = () => {
    setSelectedMoves([]);
  };

  const resetFilters = () => {
    setSelectedMoveTypes([]);
    setSelectedJogoTypes([]);
  };

  const toggleMoveSelection = (move: MovementType) => {
    setSelectedMoves((prevMoves) => {
      const index = prevMoves.findIndex(
        (previousMove) => previousMove.name === move.name
      );
      if (index > -1) {
        return prevMoves.filter(
          (previousMove) => previousMove.name !== move.name
        );
      } else if (prevMoves.length === numberOfMoves) {
        return prevMoves;
      } else {
        return [...prevMoves, move];
      }
    });
  };

  return (
    <div className="mt-4 mb-4 flex flex-col justify-center">
      <GeneratedMovementList
        clearSelectedMoves={clearSelectedMoves}
        filteredMoves={filteredMoves}
        numberOfMoves={numberOfMoves}
        selectedMoves={selectedMoves}
        setNumberOfMoves={setNumberOfMoves}
        setSelectedMoves={setSelectedMoves}
        toggleMoveSelection={toggleMoveSelection}
      />

      <div className="max-w-80 mx-auto">
        <MovementsFilter
          resetFilters={resetFilters}
          selectedJogoTypes={selectedJogoTypes}
          selectedMoveTypes={selectedMoveTypes}
          setSelectedJogoTypes={setSelectedJogoTypes}
          setSelectedMoveTypes={setSelectedMoveTypes}
        />

        <MovesList
          filteredMoves={filteredMoves}
          selectedMoves={selectedMoves}
          toggleMoveSelection={toggleMoveSelection}
        />
      </div>
    </div>
  );
}
