
import { TextFilter } from "./TextFilter";
import { RatingFilter } from "./RatingFilter";
import { WineTypeFilter } from "./WineTypeFilter";
import { SortFilter } from "./SortFilter";
import { FilterHeader } from "./FilterHeader";
import type { WineFilterOptions } from "@/types/wine";

interface DesktopFiltersProps {
  filters: WineFilterOptions;
  setFilters: React.Dispatch<React.SetStateAction<WineFilterOptions>>;
  onReset: () => void;
}

export const DesktopFilters = ({ filters, setFilters, onReset }: DesktopFiltersProps) => (
  <>
    <FilterHeader onReset={onReset} />
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
      <TextFilter
        label="Country"
        value={filters.country}
        placeholder="Filter by country"
        onChange={(value) => setFilters(prev => ({ ...prev, country: value }))}
      />
      <TextFilter
        label="Region"
        value={filters.region}
        placeholder="Filter by region"
        onChange={(value) => setFilters(prev => ({ ...prev, region: value }))}
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
  </>
);
