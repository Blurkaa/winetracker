import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { WineFormData } from "./types";

interface BasicWineInfoProps {
  formData: WineFormData;
  onUpdate: (updates: Partial<WineFormData>) => void;
}

export const BasicWineInfo = ({ formData, onUpdate }: BasicWineInfoProps) => {
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
          <Label htmlFor="grapeVariety">Grape Variety *</Label>
          <Input
            id="grapeVariety"
            value={formData.grapeVariety}
            onChange={(e) => onUpdate({ grapeVariety: e.target.value })}
            placeholder="e.g. Cabernet Sauvignon"
          />
        </div>
      </div>
    </div>
  );
};