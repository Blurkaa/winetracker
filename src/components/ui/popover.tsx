
import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"

import { cn } from "@/lib/utils"

const Popover = PopoverPrimitive.Root

const PopoverTrigger = PopoverPrimitive.Trigger

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => {
  // Find and store reference to the parent dialog when popover opens
  React.useEffect(() => {
    // Find the closest dialog container
    const dialogElement = document.querySelector('[role="dialog"]');
    if (dialogElement instanceof HTMLElement) {
      // Store original overflow and pointer-events settings
      const originalOverflow = dialogElement.style.overflow;
      const originalPointerEvents = dialogElement.style.pointerEvents;
      
      // Temporarily disable scrolling and pointer events on dialog
      dialogElement.style.overflow = 'hidden';
      dialogElement.style.pointerEvents = 'none';
      
      // Restore original settings when dropdown closes
      return () => {
        dialogElement.style.overflow = originalOverflow;
        dialogElement.style.pointerEvents = originalPointerEvents;
      };
    }
  }, []);

  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        ref={ref}
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "z-[1000] w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          className
        )}
        style={{ 
          overscrollBehavior: 'contain',
          touchAction: 'none',
          position: 'fixed',
          pointerEvents: 'auto'
        }}
        {...props}
      />
    </PopoverPrimitive.Portal>
  )
})
PopoverContent.displayName = PopoverPrimitive.Content.displayName

export { Popover, PopoverTrigger, PopoverContent }
