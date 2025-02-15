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

export default function MovesList() {
  const [selectedMoveTypes, setSelectedMoveTypes] = useState<string[]>([]);
  const [selectedJogoTypes, setSelectedJogoTypes] = useState<JogoType[]>([]);
  const [randomMoves, setRandomMoves] = useState<MovementType[]>([]);
  const [randomMovesHeight, setRandomMovesHeight] = useState<number>(0);

  const randomMovesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (randomMovesRef.current) {
      setRandomMovesHeight(randomMovesRef.current.scrollHeight);
    }
  }, [randomMoves]);

  const filteredMoves = Object.values(capoeiraMovements).filter(
    (move) =>
      (selectedMoveTypes.length === 0 ||
        selectedMoveTypes.includes(move.moveType)) &&
      (selectedJogoTypes.length === 0 ||
        selectedJogoTypes.some((jogo) => move.jogoType.includes(jogo)))
  );

  const pickRandomMoves = () => {
    const shuffled = [...filteredMoves].sort(() => 0.5 - Math.random());
    setRandomMoves(shuffled.slice(0, 3));
  };

  return (
    <div className="mt-4 mb-4 flex flex-col justify-center">
      <h3 className="text-lg font-bold mb-2">Capoeira Moves</h3>
      <div className="mb-4 flex gap-2">
        <Button variant={"custom"} onClick={pickRandomMoves} className="w-2/3">
          Pick 3 Random Moves
        </Button>
        <Button
          variant={"custom"}
          onClick={() => setRandomMoves([])}
          className="w-1/3"
        >
          Clear
        </Button>
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
                <Button
                  variant={"custom"}
                  key={move.name}
                  className="w-full py-2 px-4 border border-gray-300 mt-0 rounded-md text-left hover:text-gray-500 transition-colors shadow-md content-center"
                >
                  {move.name}
                </Button>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="max-w-80 mx-auto">
        <h3 className="text-lg font-semibold mb-2">Filter Moves</h3>
        <div className="mb-4 flex flex-col gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="custom">
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
              <Button variant="custom">
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

        <p>Move Types: {filteredMoves.length}</p>
        <div className="h-80 overflow-y-auto border border-gray-300 rounded-lg shadow-xl">
          <ul className="space-y-3 p-4 min-w-80">
            {filteredMoves.map((move: MovementType) => (
              <li key={move.name} className="w-full">
                <Button variant="custom" size="full">
                  {move.name}
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
