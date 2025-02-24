
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
            <label
              htmlFor={`${label.toLowerCase()}-${option}`}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 capitalize cursor-pointer"
            >
              {customLabels[option] || option}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};
