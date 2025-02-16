import React from "react";

import { moveTypes, jogoTypes, JogoType } from "@/consts/movementList";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import SectionTitle from "./SectionTitle";

export interface MovementsFilterProps {
  selectedMoveTypes: string[];
  selectedJogoTypes: JogoType[];
  setSelectedMoveTypes: (value: string[]) => void;
  setSelectedJogoTypes: (value: JogoType[]) => void;
  resetFilters: () => void;
}

export default function MovementsFilter({
  selectedMoveTypes,
  selectedJogoTypes,
  setSelectedMoveTypes,
  setSelectedJogoTypes,
  resetFilters,
}: MovementsFilterProps) {
  return (
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
  );
}
