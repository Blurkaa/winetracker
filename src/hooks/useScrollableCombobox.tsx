import * as React from "react";

interface ScrollBoundaries {
  isAtTop: boolean;
  isAtBottom: boolean;
}

export function useScrollableCombobox(open: boolean) {
  const scrollableRef = React.useRef<HTMLDivElement>(null);
  const [scrollBoundaries, setScrollBoundaries] = React.useState<ScrollBoundaries>({
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
    console.log('Dropdown scroll bounds:', { scrollTop, scrollHeight, clientHeight, isAtTop, isAtBottom });
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
  
  // Improved wheel event handler for the scrollable container
  const handleScrollableWheel = React.useCallback((e: React.WheelEvent) => {
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
      console.log('Dropdown handling scroll', { 
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
  }, [scrollBoundaries, updateScrollBoundaries]);

  // Main popover wheel handler - always block events to prevent dialog scrolling
  const handlePopoverWheel = React.useCallback((e: React.WheelEvent) => {
    e.stopPropagation();
  }, []);

  return {
    scrollableRef,
    handleScrollableWheel,
    handlePopoverWheel,
    updateScrollBoundaries
  };
}
