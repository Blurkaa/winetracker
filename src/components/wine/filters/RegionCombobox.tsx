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
  
  // Scroll boundaries state to optimize wheel event handling
  const [scrollBoundaries, setScrollBoundaries] = React.useState({
    isAtTop: true,
    isAtBottom: false
  });
  
  // Update scroll boundaries whenever scroll happens
  const updateScrollBoundaries = React.useCallback(() => {
    const scrollable = scrollableRef.current;
    if (!scrollable) return;
    
    const { scrollTop, scrollHeight, clientHeight } = scrollable;
    const isAtTop = scrollTop <= 0;
    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;
    
    setScrollBoundaries({ isAtTop, isAtBottom });
    
    // Debug logging
    console.log('Region dropdown scroll bounds:', { scrollTop, scrollHeight, clientHeight, isAtTop, isAtBottom });
  }, []);
  
  // Set up scroll event listener to keep boundaries updated
  React.useEffect(() => {
    const scrollable = scrollableRef.current;
    if (!open || !scrollable) return;
    
    // Initial boundary check
    updateScrollBoundaries();
    
    // Keep boundaries updated during scrolling
    scrollable.addEventListener('scroll', updateScrollBoundaries);
    return () => {
      scrollable.removeEventListener('scroll', updateScrollBoundaries);
    };
  }, [open, updateScrollBoundaries]);
  
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

  // Improved wheel event handler for the scrollable container
  const handleScrollableWheel = (e: React.WheelEvent) => {
    const scrollable = scrollableRef.current;
    if (!scrollable) return;
    
    const { isAtTop, isAtBottom } = scrollBoundaries;
    
    // Determine if we should block the event from propagating
    const isScrollingUp = e.deltaY < 0;
    const isScrollingDown = e.deltaY > 0;
    
    const shouldBlockScroll = 
      // If scrolling up and not at the top, block propagation
      (isScrollingUp && !isAtTop) || 
      // If scrolling down and not at the bottom, block propagation
      (isScrollingDown && !isAtBottom);
    
    if (shouldBlockScroll) {
      // If we can scroll further, prevent default and stop propagation
      e.preventDefault();
      e.stopPropagation();
      
      // Manual scrolling instead of relying on default browser behavior
      scrollable.scrollTop += e.deltaY;
      
      // Update boundaries after manual scroll
      updateScrollBoundaries();
      
      // Debug logging
      console.log('Region dropdown handling scroll', { 
        deltaY: e.deltaY,
        isScrollingUp,
        isScrollingDown,
        isAtTop,
        isAtBottom,
        shouldBlockScroll,
        newScrollTop: scrollable.scrollTop
      });
    } else {
      // If at boundaries, just stop propagation to prevent parent dialog from scrolling
      e.stopPropagation();
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
              WebkitOverflowScrolling: 'touch',
              position: 'relative',
              zIndex: 10
            }}
            onWheel={handleScrollableWheel}
            onScroll={updateScrollBoundaries}
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
