
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

interface CountryComboboxProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

export function CountryCombobox({ value, onChange, placeholder }: CountryComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const countries = React.useMemo(() => getAllCountries(), []);
  const scrollableRef = React.useRef<HTMLDivElement>(null);
  
  const filteredCountries = React.useMemo(() => {
    if (!searchTerm) return countries;
    
    // Check if search term exactly matches any existing country
    const exactMatch = countries.find(
      country => country.toLowerCase() === searchTerm.toLowerCase()
    );
    
    // Get all partial matches
    const partialMatches = countries.filter(
      country => country.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    // If there's no exact match and the search term isn't empty, add it as a custom option
    if (!exactMatch && searchTerm.trim() !== "") {
      return [searchTerm, ...partialMatches];
    }
    
    return partialMatches;
  }, [countries, searchTerm]);

  const handleSelect = React.useCallback((country: string) => {
    onChange(country === value ? "" : country);
    setOpen(false);
    setSearchTerm("");
  }, [onChange, value]);

  // Handle Enter key press in search input
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchTerm.trim() !== "") {
      e.preventDefault();
      handleSelect(searchTerm);
    }
  };

  // Prevent clicks inside the popover from closing it
  const handlePopoverClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  // Improved wheel event handler for the scrollable container
  const handleScrollableWheel = (e: React.WheelEvent) => {
    const scrollable = scrollableRef.current;
    if (!scrollable) return;
    
    const { scrollTop, scrollHeight, clientHeight } = scrollable;
    const isAtTop = scrollTop === 0;
    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;
    
    // If at the boundary and trying to scroll beyond, prevent default
    if ((isAtTop && e.deltaY < 0) || (isAtBottom && e.deltaY > 0)) {
      e.preventDefault();
    }
    
    // Always stop propagation to prevent parent scrolling
    e.stopPropagation();
  };

  // Main popover wheel handler - always block events from reaching dialog
  const handlePopoverWheel = (e: React.WheelEvent) => {
    e.stopPropagation();
    e.preventDefault();
  };

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
        className="p-0 w-[var(--radix-popover-trigger-width)] min-w-[200px] z-[100]" 
        align="start"
        sideOffset={5}
        onClick={handlePopoverClick}
        onWheel={handlePopoverWheel}
        style={{ 
          overscrollBehavior: 'none',
          touchAction: 'none'
        }}
      >
        <div className="p-2 bg-popover">
          <Input
            placeholder="Search countries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            className="mb-2"
            autoFocus
          />
          <div 
            ref={scrollableRef}
            className="max-h-[200px] overflow-y-auto pr-1"
            style={{ 
              scrollbarWidth: 'thin',
              scrollbarColor: '#9ca3af transparent',
              overscrollBehavior: 'contain',
              msOverflowStyle: 'auto',
              WebkitOverflowScrolling: 'touch'
            }}
            onWheel={handleScrollableWheel}
          >
            {filteredCountries.length === 0 ? (
              <div className="py-6 text-center text-sm">No country found</div>
            ) : (
              filteredCountries.map((country, index) => (
                <Button
                  key={`${country}-${index}`}
                  variant="ghost"
                  className={cn(
                    "relative flex w-full justify-start font-normal",
                    value === country ? "bg-accent text-accent-foreground" : ""
                  )}
                  onClick={() => handleSelect(country)}
                  type="button"
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
        </div>
      </PopoverContent>
    </Popover>
  );
}
