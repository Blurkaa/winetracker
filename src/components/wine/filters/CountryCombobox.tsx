
import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getAllCountries } from "@/data/wineRegions";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface CountryComboboxProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

export function CountryCombobox({ value, onChange, placeholder }: CountryComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const countries = React.useMemo(() => getAllCountries(), []);
  
  const filteredCountries = React.useMemo(() => {
    return searchTerm 
      ? countries.filter(country => 
          country.toLowerCase().includes(searchTerm.toLowerCase()))
      : countries;
  }, [countries, searchTerm]);

  const handleSelect = React.useCallback((country: string) => {
    onChange(country === value ? "" : country);
    setOpen(false);
    setSearchTerm("");
  }, [onChange, value]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between w-full bg-background"
        >
          {value ? value : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="p-0 w-[var(--radix-popover-trigger-width)] min-w-[200px]" 
        align="start"
        sideOffset={5}
      >
        <div className="p-2 bg-popover">
          <Input
            placeholder="Search countries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-2"
          />
          <ScrollArea className="h-[200px]">
            <div className="p-1">
              {filteredCountries.length === 0 ? (
                <div className="py-6 text-center text-sm">No country found</div>
              ) : (
                filteredCountries.map((country) => (
                  <Button
                    key={country}
                    variant="ghost"
                    className={cn(
                      "relative flex w-full justify-start font-normal",
                      value === country ? "bg-accent text-accent-foreground" : ""
                    )}
                    onClick={() => handleSelect(country)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === country ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {country}
                  </Button>
                ))
              )}
            </div>
          </ScrollArea>
        </div>
      </PopoverContent>
    </Popover>
  );
}
