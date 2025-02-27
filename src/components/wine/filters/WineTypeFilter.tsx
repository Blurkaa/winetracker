
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface WineTypeFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export const WineTypeFilter = ({ value, onChange }: WineTypeFilterProps) => (
  <div className="space-y-2">
    <Label>Wine Type</Label>
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder="Select type" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">Any type</SelectItem>
        <SelectItem value="red">Red</SelectItem>
        <SelectItem value="white">White</SelectItem>
        <SelectItem value="rosé">Rosé</SelectItem>
        <SelectItem value="sparkling">Sparkling</SelectItem>
        <SelectItem value="sweet">Sweet</SelectItem>
        <SelectItem value="fortified">Fortified</SelectItem>
      </SelectContent>
    </Select>
  </div>
);
