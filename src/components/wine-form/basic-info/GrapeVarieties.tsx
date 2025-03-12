import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { WineFormData } from "../types";
import { useState, useEffect } from "react";
import { getAllGrapeVarieties } from "@/data/grapeVarieties";
import { BaseCombobox } from "@/components/wine/filters/BaseCombobox";

interface GrapeVarietiesProps {
  grapeVariety: string[];
  onUpdate: (updates: Partial<WineFormData>) => void;
}

export const GrapeVarieties = ({ grapeVariety, onUpdate }: GrapeVarietiesProps) => {
  const [grapeInput, setGrapeInput] = useState("");
  const [existingGrapes, setExistingGrapes] = useState<string[]>([]);
  
  useEffect(() => {
    const predefinedGrapes = getAllGrapeVarieties();
    setExistingGrapes(predefinedGrapes);
  }, []);

  const handleAddGrape = (grape: string) => {
    if (grape && !grapeVariety.includes(grape)) {
      onUpdate({ grapeVariety: [...grapeVariety, grape] });
      setGrapeInput("");
    }
  };

  const handleRemoveGrape = (grapeToRemove: string) => {
    onUpdate({
      grapeVariety: grapeVariety.filter(grape => grape !== grapeToRemove)
    });
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="grapeVariety">Grape Varieties *</Label>
      <div className="flex flex-wrap gap-2 mb-2">
        {grapeVariety.map((grape) => (
          <Badge 
            key={grape}
            variant="secondary"
            className="flex items-center gap-1"
          >
            {grape}
            <button
              type="button"
              onClick={() => handleRemoveGrape(grape)}
              className="hover:bg-secondary rounded-full"
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>
      
      <BaseCombobox
        value={grapeInput}
        onChange={(value) => {
          handleAddGrape(value);
        }}
        placeholder="Select or type a grape variety"
        searchPlaceholder="Search grape varieties..."
        options={existingGrapes.filter(grape => !grapeVariety.includes(grape))}
        onSearchChange={(value) => setGrapeInput(value)}
        customOptionHandler={(searchTerm, options) => {
          if (!searchTerm) return options;
          
          const exactMatch = options.find(
            option => option.toLowerCase() === searchTerm.toLowerCase()
          );
          
          const partialMatches = options.filter(
            option => option.toLowerCase().includes(searchTerm.toLowerCase())
          );
          
          if (!exactMatch && searchTerm.trim() !== "") {
            return [searchTerm, ...partialMatches];
          }
          
          return partialMatches;
        }}
      />
    </div>
  );
};
