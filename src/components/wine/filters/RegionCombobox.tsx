
import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getRegionsByCountry, getAllRegions } from "@/data/wineRegions";

interface RegionComboboxProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  country: string;
}

export function RegionCombobox({ value, onChange, placeholder, country }: RegionComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const regions = React.useMemo(() => {
    return country ? getRegionsByCountry(country) : getAllRegions() || [];
  }, [country]);

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
        <Command>
          <CommandInput placeholder="Search regions..." />
          <CommandEmpty>
            {country ? "No region found." : "Please select a country first."}
          </CommandEmpty>
          <CommandGroup className="max-h-60 overflow-y-auto">
            {regions.map((region) => (
              <CommandItem
                key={region}
                value={region}
                onSelect={(currentValue) => {
                  onChange(currentValue === value ? "" : currentValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === region ? "opacity-100" : "opacity-0"
                  )}
                />
                {region}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
