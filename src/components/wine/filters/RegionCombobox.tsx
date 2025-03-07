
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
  const scrollableRef = React.useRef<HTMLDivElement>(null);
  const dialogRef = React.useRef<HTMLDivElement | null>(null);
  
  // Find and store reference to the parent dialog when dropdown opens
  React.useEffect(() => {
    if (open) {
      // Find the closest dialog container
      const dialogElement = document.querySelector('[role="dialog"]');
      if (dialogElement instanceof HTMLDivElement) {
        dialogRef.current = dialogElement;
        
        // Store original overflow setting
        const originalOverflow = dialogElement.style.overflow;
        
        // Temporarily disable scrolling on dialog
        dialogElement.style.overflow = 'hidden';
        
        // Restore original overflow when dropdown closes
        return () => {
          dialogElement.style.overflow = originalOverflow;
        };
      }
    }
  }, [open]);
  
  const regions = React.useMemo(() => {
    return country ? getRegionsByCountry(country) : getAllRegions();
  }, [country]);
  
  const filteredRegions = React.useMemo(() => {
    if (!searchTerm) return regions;

    // Check if search term exactly matches any existing region
    const exactMatch = regions.find(
      region => region.toLowerCase() === searchTerm.toLowerCase()
    );
    
    // Get all partial matches
    const partialMatches = regions.filter(
      region => region.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    // If there's no exact match and the search term isn't empty, add it as a custom option
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

  // Handle Enter key press in search input
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchTerm.trim() !== "") {
      e.preventDefault();
      handleSelect(searchTerm);
    }
  };

  // Reset region value when country changes if the current region is not in the new country's list
  React.useEffect(() => {
    if (country && value && !getRegionsByCountry(country).includes(value)) {
      onChange("");
    }
  }, [country, value, onChange]);

  // Prevent clicks inside the popover from closing it
  const handlePopoverClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  // Smart wheel event handler for the scrollable container
  const handleScrollableWheel = (e: React.WheelEvent) => {
    const scrollable = scrollableRef.current;
    if (!scrollable) return;
    
    // Get current scroll metrics
    const { scrollTop, scrollHeight, clientHeight } = scrollable;
    
    // Calculate if we're at boundaries
    const isAtTop = scrollTop <= 0;
    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;
    
    // Determine if we should block the event from propagating
    const shouldBlockScroll = 
      // If scrolling up and not at the top, block propagation
      (e.deltaY < 0 && !isAtTop) || 
      // If scrolling down and not at the bottom, block propagation
      (e.deltaY > 0 && !isAtBottom);
    
    if (shouldBlockScroll) {
      // If we can scroll further, prevent default and stop propagation
      e.preventDefault();
      e.stopPropagation();
      
      // Log for debugging
      console.log('Region scroll', { 
        scrollTop, 
        scrollHeight, 
        clientHeight, 
        deltaY: e.deltaY,
        isAtTop,
        isAtBottom,
        shouldBlockScroll
      });
    }
  };

  // Main popover wheel handler - always block events to prevent dialog scrolling
  const handlePopoverWheel = (e: React.WheelEvent) => {
    e.stopPropagation();
  };

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
        className="p-0 w-[var(--radix-popover-trigger-width)] min-w-[200px] z-[1000]" 
        align="start"
        sideOffset={5}
        onClick={handlePopoverClick}
        onWheel={handlePopoverWheel}
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
      </PopoverContent>
    </Popover>
  );
}
