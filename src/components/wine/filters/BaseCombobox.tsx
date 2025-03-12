
import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { useScrollableCombobox } from "@/hooks/useScrollableCombobox";

interface BaseComboboxProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  searchPlaceholder?: string;
  options: string[];
  disabled?: boolean;
  customOptionHandler?: (searchTerm: string, options: string[]) => string[];
  onSearchChange?: (value: string) => void;
}

export function BaseCombobox({ 
  value, 
  onChange, 
  placeholder, 
  searchPlaceholder = "Search...",
  options,
  disabled = false,
  customOptionHandler,
  onSearchChange
}: BaseComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  
  const { 
    scrollableRef, 
    handleScrollableWheel, 
    handlePopoverWheel, 
    updateScrollBoundaries 
  } = useScrollableCombobox(open);
  
  const filteredOptions = React.useMemo(() => {
    if (customOptionHandler) {
      return customOptionHandler(searchTerm, options);
    }
    
    if (!searchTerm) return options;
    
    const exactMatch = options.find(
      option => option.toLowerCase() === searchTerm.toLowerCase()
    );
    
    const partialMatches = options.filter(
      option => option.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    if (!exactMatch && searchTerm.trim() !== "") {
      return [searchTerm, ...partialMatches];
    }
    
    return partialMatches;
  }, [options, searchTerm, customOptionHandler]);

  const handleSelect = React.useCallback((option: string) => {
    onChange(option === value ? "" : option);
    setOpen(false);
    setSearchTerm("");
  }, [onChange, value]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchTerm.trim() !== "") {
      e.preventDefault();
      handleSelect(searchTerm);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchTerm(newValue);
    if (onSearchChange) {
      onSearchChange(newValue);
    }
  };

  const handlePopoverClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const triggerRef = React.useRef<HTMLButtonElement>(null);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between w-full bg-background text-left font-normal"
          disabled={disabled}
          ref={triggerRef}
        >
          <span className="truncate">{value ? value : placeholder}</span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="p-0 w-full min-w-[var(--radix-popover-trigger-width)] z-[1000]" 
        align="start"
        sideOffset={5}
        onClick={handlePopoverClick}
        onWheel={handlePopoverWheel}
      >
        <div className="p-2 bg-popover">
          <Input
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={handleSearchChange}
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
            {filteredOptions.length === 0 ? (
              <div className="py-6 text-center text-sm">No options found</div>
            ) : (
              filteredOptions.map((option, index) => (
                <Button
                  key={`${option}-${index}`}
                  variant="ghost"
                  className={cn(
                    "relative flex w-full justify-start font-normal py-1 px-1 h-auto min-h-7 rounded-sm",
                    value === option ? "bg-accent text-accent-foreground" : ""
                  )}
                  onClick={() => handleSelect(option)}
                  type="button"
                >
                  <Check
                    className={cn(
                      "mr-0.5 h-3.5 w-3.5 flex-shrink-0",
                      value === option ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <span className="truncate">{option}</span>
                </Button>
              ))
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
