
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { WineFormData } from "../types";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface GrapeVarietiesProps {
  grapeVariety: string[];
  onUpdate: (updates: Partial<WineFormData>) => void;
}

export const GrapeVarieties = ({ grapeVariety, onUpdate }: GrapeVarietiesProps) => {
  const [grapeInput, setGrapeInput] = useState("");
  const [existingGrapes, setExistingGrapes] = useState<string[]>([]);

  useEffect(() => {
    const fetchExistingGrapes = async () => {
      const { data, error } = await supabase
        .from('wines')
        .select('grape_variety');
      
      if (!error && data) {
        const uniqueGrapes = Array.from(new Set(
          data.flatMap(wine => wine.grape_variety || [])
        )).sort();
        setExistingGrapes(uniqueGrapes);
      }
    };

    fetchExistingGrapes();
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
      <div className="flex gap-2">
        <Select
          value={grapeInput}
          onValueChange={(value) => {
            handleAddGrape(value);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select or type a grape variety" />
          </SelectTrigger>
          <SelectContent>
            {existingGrapes
              .filter(grape => !grapeVariety.includes(grape))
              .map((grape) => (
                <SelectItem key={grape} value={grape}>
                  {grape}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
        <Input
          placeholder="Or type a new variety"
          value={grapeInput}
          onChange={(e) => setGrapeInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleAddGrape(grapeInput);
            }
          }}
        />
      </div>
    </div>
  );
};
