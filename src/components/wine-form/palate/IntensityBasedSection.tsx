import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface IntensityBasedSectionProps {
  label: string;
  value: string;
  onChange: (value: string, isChecked: boolean) => void;
  options?: string[];
  customLabels?: { [key: string]: string };
}

export const IntensityBasedSection = ({ 
  label, 
  value, 
  onChange, 
  options = ["low", "medium-", "medium", "medium+", "high"],
  customLabels = {}
}: IntensityBasedSectionProps) => {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="grid grid-cols-3 gap-2">
        {options.map((option) => (
          <div key={option} className="flex items-center space-x-2">
            <Checkbox
              id={`${label.toLowerCase()}-${option}`}
              checked={value === option}
              onCheckedChange={(checked) => onChange(option, checked as boolean)}
            />
            <Label htmlFor={`${label.toLowerCase()}-${option}`} className="capitalize">
              {customLabels[option] || option}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};