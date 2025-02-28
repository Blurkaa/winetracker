
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronUp, ChevronDown, RotateCcw } from "lucide-react";
import { TextFilter } from "./TextFilter";
import { RatingFilter } from "./RatingFilter";
import { WineTypeFilter } from "./WineTypeFilter";
import { SortFilter } from "./SortFilter";
import type { WineFilterOptions } from "@/types/wine";

interface MobileFiltersProps {
  filters: WineFilterOptions;
  setFilters: React.Dispatch<React.SetStateAction<WineFilterOptions>>;
  onReset: () => void;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export const MobileFilters = ({ filters, setFilters, onReset, isOpen, setIsOpen }: MobileFiltersProps) => (
  <Collapsible open={isOpen} onOpenChange={setIsOpen}>
    <div className="flex justify-between items-center mb-4">
      <h2 className="font-playfair text-xl font-semibold">Filter Wines</h2>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          onClick={onReset}
          className="text-wine hover:text-wine-light"
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset Filters
        </Button>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="icon">
            {isOpen ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </CollapsibleTrigger>
      </div>
    </div>
    <CollapsibleContent>
      <div className="space-y-4">
        <div className="space-y-4">
          <TextFilter
            label="Country"
            value={filters.country}
            placeholder="Filter by country"
            onChange={(value) => setFilters(prev => ({ ...prev, country: value }))}
            type="country"
          />
          <TextFilter
            label="Region"
            value={filters.region}
            placeholder="Filter by region"
            onChange={(value) => setFilters(prev => ({ ...prev, region: value }))}
            type="region"
            countryValue={filters.country}
          />
          <TextFilter
            label="Grape Variety"
            value={filters.grapeVariety}
            placeholder="Filter by grape"
            onChange={(value) => setFilters(prev => ({ ...prev, grapeVariety: value }))}
          />
          <RatingFilter
            minRating={filters.minRating}
            ratingSort={filters.ratingSort}
            onRatingChange={(value) => setFilters(prev => ({ ...prev, minRating: value }))}
            onSortChange={(value) => setFilters(prev => ({ ...prev, ratingSort: value }))}
          />
          <WineTypeFilter
            value={filters.type}
            onChange={(value) => setFilters(prev => ({ ...prev, type: value }))}
          />
          <SortFilter
            value={filters.sort}
            onChange={(value) => setFilters(prev => ({ ...prev, sort: value }))}
          />
        </div>
      </div>
    </CollapsibleContent>
  </Collapsible>
);
