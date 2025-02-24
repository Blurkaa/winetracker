
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { WineFormData } from "../types";

interface MousseSectionProps {
  mousse?: WineFormData['palate']['mousse'];
  onMousseChange: (value: string, isChecked: boolean) => void;
}

export const MousseSection = ({ mousse, onMousseChange }: MousseSectionProps) => {
  const mousseOptions = ["delicate", "creamy", "aggressive"];

  return (
    <div className="space-y-2">
      <Label>Mousse</Label>
      <div className="grid grid-cols-3 gap-2">
        {mousseOptions.map((option) => (
          <div key={option} className="flex items-center space-x-2">
            <Checkbox
              id={`mousse-${option}`}
              checked={mousse === option}
              onCheckedChange={(checked) => onMousseChange(option, checked as boolean)}
            />
            <label
              htmlFor={`mousse-${option}`}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 capitalize cursor-pointer"
            >
              {option}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};
