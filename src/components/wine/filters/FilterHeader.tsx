
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

interface FilterHeaderProps {
  onReset: () => void;
}

export const FilterHeader = ({ onReset }: FilterHeaderProps) => (
  <div className="flex justify-between items-center mb-4">
    <h2 className="font-playfair text-xl font-semibold">Filter Wines</h2>
    <Button
      variant="outline"
      onClick={onReset}
      className="text-wine hover:text-wine-light"
    >
      <RotateCcw className="mr-2 h-4 w-4" />
      Reset Filters
    </Button>
  </div>
);
