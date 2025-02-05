import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { WineFilterOptions } from "@/types/wine";

interface WineFiltersProps {
  filters: WineFilterOptions;
  setFilters: React.Dispatch<React.SetStateAction<WineFilterOptions>>;
  onReset: () => void;
}

export const WineFilters = ({ filters, setFilters, onReset }: WineFiltersProps) => {
  return (
    <div className="bg-white rounded-lg p-6 mb-8 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-playfair text-xl font-semibold">Filter Wines</h2>
        <Button
          variant="outline"
          onClick={onReset}
          className="text-wine hover:text-wine-light"
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset Filters
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
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
              <SelectItem value="all">Any rating</SelectItem>
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
        <div className="space-y-2">
          <Label>Sort By</Label>
          <Select
            value={filters.sort}
            onValueChange={(value) => setFilters(prev => ({ ...prev, sort: value }))}
          >
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
      </div>
    </div>
  );
};
