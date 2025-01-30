import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface WineFiltersProps {
  filters: {
    country: string;
    region: string;
    grapeVariety: string;
    minRating: string;
    type: string;
  };
  setFilters: React.Dispatch<React.SetStateAction<{
    country: string;
    region: string;
    grapeVariety: string;
    minRating: string;
    type: string;
  }>>;
}

export const WineFilters = ({ filters, setFilters }: WineFiltersProps) => {
  return (
    <div className="bg-white rounded-lg p-6 mb-8 shadow-sm">
      <h2 className="font-playfair text-xl font-semibold mb-4">Filter Wines</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="space-y-2">
          <Label>Country</Label>
          <Input
            placeholder="Filter by country"
            value={filters.country}
            onChange={(e) => setFilters(prev => ({ ...prev, country: e.target.value }))}
          />
        </div>
        <div className="space-y-2">
          <Label>Region</Label>
          <Input
            placeholder="Filter by region"
            value={filters.region}
            onChange={(e) => setFilters(prev => ({ ...prev, region: e.target.value }))}
          />
        </div>
        <div className="space-y-2">
          <Label>Grape Variety</Label>
          <Input
            placeholder="Filter by grape"
            value={filters.grapeVariety}
            onChange={(e) => setFilters(prev => ({ ...prev, grapeVariety: e.target.value }))}
          />
        </div>
        <div className="space-y-2">
          <Label>Minimum Rating</Label>
          <Select
            value={filters.minRating}
            onValueChange={(value) => setFilters(prev => ({ ...prev, minRating: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select rating" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Any rating</SelectItem>
              {[1, 2, 3, 4, 5].map((rating) => (
                <SelectItem key={rating} value={rating.toString()}>
                  {rating} star{rating !== 1 ? "s" : ""} or higher
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Wine Type</Label>
          <Select
            value={filters.type}
            onValueChange={(value) => setFilters(prev => ({ ...prev, type: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Any type</SelectItem>
              <SelectItem value="red">Red</SelectItem>
              <SelectItem value="white">White</SelectItem>
              <SelectItem value="rosé">Rosé</SelectItem>
              <SelectItem value="sparkling">Sparkling</SelectItem>
              <SelectItem value="sweet">Sweet</SelectItem>
              <SelectItem value="fortified">Fortified</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};