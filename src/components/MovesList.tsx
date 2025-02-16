"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  capoeiraMovements,
  MovementType,
  moveTypes,
  jogoTypes,
  JogoType,
} from "@/consts/movementList";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import SectionTitle from "./SectionTitle";

const MOVES_NUMBER = 3;

export default function MovesList() {
  const [selectedMoveTypes, setSelectedMoveTypes] = useState<string[]>([]);
  const [selectedJogoTypes, setSelectedJogoTypes] = useState<JogoType[]>([]);
  const [selectedMoves, setSelectedMoves] = useState<MovementType[]>([]);
  const [selectedMovesHeight, setSelectedMovesHeight] = useState<number>(0);

  const selectedMovesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedMovesRef.current) {
      setSelectedMovesHeight(selectedMovesRef.current.scrollHeight);
    }
  }, [selectedMoves]);

  const filteredMoves = Object.values(capoeiraMovements).filter(
    (move) =>
      (selectedMoveTypes.length === 0 ||
        selectedMoveTypes.includes(move.moveType)) &&
      (selectedJogoTypes.length === 0 ||
        selectedJogoTypes.some((jogo) => move.jogoType.includes(jogo)))
  );

  const addRandomMoves = () => {
    const shuffled = [...filteredMoves].sort(() => 0.5 - Math.random());
    setSelectedMoves(() => [...shuffled.slice(0, MOVES_NUMBER)]);
  };

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
      } else if (prevMoves.length === MOVES_NUMBER) {
        return prevMoves;
      } else {
        return [...prevMoves, move];
      }
    });
  };

  return (
    <div className="mt-4 mb-4 flex flex-col justify-center">
      <section>
        <SectionTitle>Capoeira Moves</SectionTitle>
        <div className="mb-4 flex gap-2">
          <Button variant={"custom"} onClick={addRandomMoves} className="w-2/3">
            Add {MOVES_NUMBER} Random Moves
          </Button>
          <Button
            variant={"custom"}
            onClick={clearSelectedMoves}
            className="w-1/3"
          >
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
                  <Button
                    variant={"custom"}
                    key={move.name}
                    onClick={() => toggleMoveSelection(move)}
                    className="py-2 px-4 border border-gray-300 mt-0 rounded-md text-left hover:text-gray-500 transition-colors shadow-md content-center"
                  >
                    {move.name}
                  </Button>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      <div className="max-w-80 mx-auto">
        <section>
          <SectionTitle>Filter Moves</SectionTitle>
          <div className="mb-4 flex flex-col gap-2">
            <div className="flex gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="custom" className="flex-1">
                    Move Types ({selectedMoveTypes.length || "All"})
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <ToggleGroup
                    type="multiple"
                    value={selectedMoveTypes}
                    onValueChange={setSelectedMoveTypes}
                    className="flex flex-wrap gap-1"
                  >
                    {moveTypes.map((type) => (
                      <ToggleGroupItem
                        key={type}
                        value={type}
                        aria-label={type}
                        className="capitalize py-2 px-4 border border-gray-300 rounded-md text-left hover:text-gray-500 transition-colors duration-200 shadow-md"
                      >
                        {type}
                      </ToggleGroupItem>
                    ))}
                  </ToggleGroup>
                </PopoverContent>
              </Popover>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="custom" className="flex-1">
                    Jogo Types ({selectedJogoTypes.length || "All"})
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <ToggleGroup
                    type="multiple"
                    value={selectedJogoTypes}
                    onValueChange={(value: JogoType[]) =>
                      setSelectedJogoTypes(value)
                    }
                    className="flex flex-wrap gap-1"
                  >
                    {jogoTypes.map((type) => (
                      <ToggleGroupItem
                        key={type}
                        value={type}
                        aria-label={type}
                        className="capitalize py-2 px-4 border border-gray-300 rounded-md text-left hover:text-gray-500 transition-colors duration-200 shadow-md"
                      >
                        {type}
                      </ToggleGroupItem>
                    ))}
                  </ToggleGroup>
                </PopoverContent>
              </Popover>
            </div>
            <Button variant="custom" onClick={resetFilters}>
              Reset Filters
            </Button>
          </div>
        </section>

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
      </div>
    </div>
  );
}
