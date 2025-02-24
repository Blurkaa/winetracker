
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { WineFormData } from "../types";

interface ClaritySectionProps {
  clarity: WineFormData['appearance']['clarity'];
  onClarityChange: (value: string, isChecked: boolean) => void;
}

export const ClaritySection = ({ clarity, onClarityChange }: ClaritySectionProps) => {
  const clarityOptions = ["clear", "hazy"];

  return (
    <div className="space-y-2">
      <Label>Clarity</Label>
      <div className="flex gap-4">
        {clarityOptions.map((option) => (
          <div key={option} className="flex items-center space-x-2">
            <Checkbox
              id={`clarity-${option}`}
              checked={clarity === option}
              onCheckedChange={(checked) => onClarityChange(option, checked as boolean)}
            />
            <label
              htmlFor={`clarity-${option}`}
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
