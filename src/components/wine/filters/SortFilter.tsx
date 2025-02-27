
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SortFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export const SortFilter = ({ value, onChange }: SortFilterProps) => (
  <div className="space-y-2">
    <Label>Sort By</Label>
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder="Sort by..." />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="recent">Most Recent</SelectItem>
        <SelectItem value="vintage_asc">Vintage (Oldest First)</SelectItem>
        <SelectItem value="vintage_desc">Vintage (Newest First)</SelectItem>
        <SelectItem value="price_asc">Price (Low to High)</SelectItem>
        <SelectItem value="price_desc">Price (High to Low)</SelectItem>
      </SelectContent>
    </Select>
  </div>
);
