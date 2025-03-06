
import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getRegionsByCountry, getAllRegions } from "@/data/wineRegions";
import { Input } from "@/components/ui/input";

interface RegionComboboxProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  country: string;
}

export function RegionCombobox({ value, onChange, placeholder, country }: RegionComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  
  const regions = React.useMemo(() => {
    return country ? getRegionsByCountry(country) : getAllRegions();
  }, [country]);
  
  const filteredRegions = React.useMemo(() => {
    if (!searchTerm) return regions;

    const exactMatch = regions.find(
      region => region.toLowerCase() === searchTerm.toLowerCase()
    );
    
    const partialMatches = regions.filter(
      region => region.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    if (!exactMatch && searchTerm.trim() !== "") {
      return [searchTerm, ...partialMatches];
    }
    
    return partialMatches;
  }, [regions, searchTerm]);

  const handleSelect = React.useCallback((region: string) => {
    onChange(region === value ? "" : region);
    setOpen(false);
    setSearchTerm("");
  }, [onChange, value]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchTerm.trim() !== "") {
      e.preventDefault();
      handleSelect(searchTerm);
    }
  };

  React.useEffect(() => {
    if (country && value && !getRegionsByCountry(country).includes(value)) {
      onChange("");
    }
  }, [country, value, onChange]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between w-full bg-background"
          disabled={country === ""}
        >
          {value ? value : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="p-0 w-[var(--radix-popover-trigger-width)] min-w-[200px]" 
        align="start"
        sideOffset={5}
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <div className="p-2 bg-popover">
          <Input
            placeholder="Search regions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            className="mb-2"
            autoFocus
          />
          <div 
            className="h-[300px] overflow-auto"
            style={{ overscrollBehavior: 'contain' }}
            onWheel={(e) => {
              e.stopPropagation();
            }}
          >
            <div className="p-1">
              {country ? (
                filteredRegions.length === 0 ? (
                  <div className="py-6 text-center text-sm">No region found</div>
                ) : (
                  filteredRegions.map((region, index) => (
                    <Button
                      key={`${region}-${index}`}
                      variant="ghost"
                      className={cn(
                        "relative flex w-full justify-start font-normal",
                        value === region ? "bg-accent text-accent-foreground" : ""
                      )}
                      onClick={() => handleSelect(region)}
                      type="button"
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === region ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {region}
                    </Button>
                  ))
                )
              ) : (
                <div className="py-6 text-center text-sm">Please select a country first</div>
              )}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
