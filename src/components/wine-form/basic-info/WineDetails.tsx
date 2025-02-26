
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { WineFormData } from "../types";

interface WineDetailsProps {
  vintage?: number;
  price?: number;
  type: WineFormData['type'];
  alcoholLevel?: number;
  onUpdate: (updates: Partial<WineFormData>) => void;
}

export const WineDetails = ({ vintage, price, type, alcoholLevel, onUpdate }: WineDetailsProps) => {
  const handleNumberInput = (field: 'vintage' | 'price' | 'alcoholLevel', value: string) => {
    const numValue = value === '' ? undefined : Number(value);
    onUpdate({ [field]: numValue });
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="vintage">Vintage</Label>
          <Input
            id="vintage"
            type="number"
            value={vintage ?? ''}
            onChange={(e) => handleNumberInput('vintage', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">Price</Label>
          <Input
            id="price"
            type="number"
            step="0.01"
            value={price ?? ''}
            onChange={(e) => handleNumberInput('price', e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Wine Type</Label>
        <Select
          value={type}
          onValueChange={(value: WineFormData["type"]) => onUpdate({ type: value })}
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
    </>
  );
};
