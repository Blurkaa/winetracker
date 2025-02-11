import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { WineFormData } from "./types";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface BasicWineInfoProps {
  formData: WineFormData;
  onUpdate: (updates: Partial<WineFormData>) => void;
}

export const BasicWineInfo = ({ formData, onUpdate }: BasicWineInfoProps) => {
  const [grapeInput, setGrapeInput] = useState("");
  const [existingGrapes, setExistingGrapes] = useState<string[]>([]);

  useEffect(() => {
    const fetchExistingGrapes = async () => {
      const { data, error } = await supabase
        .from('wines')
        .select('grape_variety');
      
      if (!error && data) {
        const uniqueGrapes = Array.from(new Set(
          data.flatMap(wine => wine.grape_variety)
        )).sort();
        setExistingGrapes(uniqueGrapes);
      }
    };

    fetchExistingGrapes();
  }, []);

  const handleAddGrape = (grape: string) => {
    if (grape && !formData.grapeVariety.includes(grape)) {
      onUpdate({ grapeVariety: [...formData.grapeVariety, grape] });
      setGrapeInput("");
    }
  };

  const handleRemoveGrape = (grapeToRemove: string) => {
    onUpdate({
      grapeVariety: formData.grapeVariety.filter(grape => grape !== grapeToRemove)
    });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Wine Name *</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => onUpdate({ name: e.target.value })}
          placeholder="e.g. Château Margaux"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="producer">Producer *</Label>
        <Input
          id="producer"
          value={formData.producer}
          onChange={(e) => onUpdate({ producer: e.target.value })}
          placeholder="e.g. Château Margaux"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="country">Country *</Label>
          <Input
            id="country"
            value={formData.country}
            onChange={(e) => onUpdate({ country: e.target.value })}
            placeholder="e.g. France"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="region">Region *</Label>
          <Input
            id="region"
            value={formData.region}
            onChange={(e) => onUpdate({ region: e.target.value })}
            placeholder="e.g. Bordeaux"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="appellation">Appellation</Label>
        <Input
          id="appellation"
          value={formData.appellation}
          onChange={(e) => onUpdate({ appellation: e.target.value })}
          placeholder="e.g. Margaux AOC"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="vintage">Vintage</Label>
          <Input
            id="vintage"
            type="number"
            value={formData.vintage}
            onChange={(e) => onUpdate({ vintage: Number(e.target.value) })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">Price</Label>
          <Input
            id="price"
            type="number"
            step="0.01"
            value={formData.price}
            onChange={(e) => onUpdate({ price: Number(e.target.value) })}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Wine Type</Label>
        <Select
          value={formData.type}
          onValueChange={(value: any) => onUpdate({ type: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select wine type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="red">Red</SelectItem>
            <SelectItem value="rosé">Rosé</SelectItem>
            <SelectItem value="white">White</SelectItem>
            <SelectItem value="sparkling">Sparkling</SelectItem>
            <SelectItem value="sweet">Sweet</SelectItem>
            <SelectItem value="fortified">Fortified</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="alcoholLevel">Alcohol %</Label>
          <Input
            id="alcoholLevel"
            type="number"
            step="0.1"
            value={formData.alcoholLevel}
            onChange={(e) => onUpdate({ alcoholLevel: Number(e.target.value) })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="grapeVariety">Grape Varieties *</Label>
          <div className="flex flex-wrap gap-2 mb-2">
            {formData.grapeVariety.map((grape) => (
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
                  .filter(grape => !formData.grapeVariety.includes(grape))
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
      </div>
    </div>
  );
};
