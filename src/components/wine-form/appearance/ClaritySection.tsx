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
            <Label htmlFor={`clarity-${option}`} className="capitalize">
              {option}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};