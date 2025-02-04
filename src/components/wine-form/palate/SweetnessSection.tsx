import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { WineFormData } from "../types";

interface SweetnessSectionProps {
  sweetness: WineFormData['palate']['sweetness'];
  onSweetnessChange: (value: string, isChecked: boolean) => void;
}

export const SweetnessSection = ({ sweetness, onSweetnessChange }: SweetnessSectionProps) => {
  const sweetnessOptions = ["dry", "off-dry", "medium-dry", "medium-sweet", "sweet", "luscious"];

  return (
    <div className="space-y-2">
      <Label>Sweetness</Label>
      <div className="grid grid-cols-2 gap-2">
        {sweetnessOptions.map((option) => (
          <div key={option} className="flex items-center space-x-2">
            <Checkbox
              id={`sweetness-${option}`}
              checked={sweetness === option}
              onCheckedChange={(checked) => onSweetnessChange(option, checked as boolean)}
            />
            <Label htmlFor={`sweetness-${option}`} className="capitalize">
              {option}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};