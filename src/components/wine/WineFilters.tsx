
import { useState } from "react";
import type { WineFilterOptions } from "@/types/wine";
import { MobileFilters } from "./filters/MobileFilters";
import { DesktopFilters } from "./filters/DesktopFilters";

interface WineFiltersProps {
  filters: WineFilterOptions;
  setFilters: React.Dispatch<React.SetStateAction<WineFilterOptions>>;
  onReset: () => void;
}

export const WineFilters = ({ filters, setFilters, onReset }: WineFiltersProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-lg p-6 mb-8 shadow-sm">
      <div className="md:hidden">
        <MobileFilters
          filters={filters}
          setFilters={setFilters}
          onReset={onReset}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      </div>
      <div className="hidden md:block">
        <DesktopFilters
          filters={filters}
          setFilters={setFilters}
          onReset={onReset}
        />
      </div>
    </div>
  );
};
