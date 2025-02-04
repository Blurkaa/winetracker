import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { WineFormData } from "../types";

interface IntensitySectionProps {
  intensity: WineFormData['appearance']['intensity'];
  onIntensityChange: (value: string, isChecked: boolean) => void;
}

export const IntensitySection = ({ intensity, onIntensityChange }: IntensitySectionProps) => {
  const intensityOptions = ["pale", "medium", "deep"];

  return (
    <div className="space-y-2">
      <Label>Intensity</Label>
      <div className="flex gap-4">
        {intensityOptions.map((option) => (
          <div key={option} className="flex items-center space-x-2">
            <Checkbox
              id={`intensity-${option}`}
              checked={intensity === option}
              onCheckedChange={(checked) => onIntensityChange(option, checked as boolean)}
            />
            <Label htmlFor={`intensity-${option}`} className="capitalize">
              {option}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};