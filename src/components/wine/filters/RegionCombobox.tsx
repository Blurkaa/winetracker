
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
import { ScrollArea } from "@/components/ui/scroll-area";

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
    return searchTerm 
      ? regions.filter(region => 
          region.toLowerCase().includes(searchTerm.toLowerCase()))
      : regions;
  }, [regions, searchTerm]);

  // Reset region value when country changes if the current region is not in the new country's list
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
      <PopoverContent className="p-0 w-full min-w-[200px]">
        <div className="p-2">
          <Input
            placeholder="Search regions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-2"
          />
          <ScrollArea className="h-[200px]">
            <div className="p-1">
              {country ? (
                filteredRegions.length === 0 ? (
                  <div className="py-6 text-center text-sm">No region found</div>
                ) : (
                  filteredRegions.map((region) => (
                    <div
                      key={region}
                      className={cn(
                        "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground",
                        value === region && "bg-accent text-accent-foreground"
                      )}
                      onClick={() => {
                        onChange(region === value ? "" : region);
                        setOpen(false);
                        setSearchTerm("");
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === region ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {region}
                    </div>
                  ))
                )
              ) : (
                <div className="py-6 text-center text-sm">Please select a country first</div>
              )}
            </div>
          </ScrollArea>
        </div>
      </PopoverContent>
    </Popover>
  );
}
