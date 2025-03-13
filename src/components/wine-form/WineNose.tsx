
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { WineFormData } from "./types";

interface WineNoseProps {
  formData: WineFormData;
  onUpdate: (updates: Partial<WineFormData>) => void;
}

export const WineNose = ({ formData, onUpdate }: WineNoseProps) => {
  const conditionOptions = ["clean", "unclean"];
  const intensityOptions = ["light", "medium-", "medium", "medium+", "pronounced"];
  const developmentOptions = ["youthful", "developing", "fully developed", "tired"];

  const handleConditionChange = (value: string, isChecked: boolean) => {
    if (isChecked) {
      onUpdate({
        nose: { ...formData.nose, condition: value as "clean" | "unclean" }
      });
    }
  };

  const handleIntensityChange = (value: string, isChecked: boolean) => {
    if (isChecked) {
      onUpdate({
        nose: { ...formData.nose, intensity: value as "light" | "medium-" | "medium" | "medium+" | "pronounced" }
      });
    }
  };

  const handleDevelopmentChange = (value: string, isChecked: boolean) => {
    if (isChecked) {
      onUpdate({
        nose: { ...formData.nose, development: value as "youthful" | "developing" | "fully developed" | "tired" }
      });
    }
  };

  return (
    <div>
      <h4 className="font-medium mb-2">Nose</h4>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Condition</Label>
          <div className="flex gap-4">
            {conditionOptions.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <Checkbox
                  id={`condition-${option}`}
                  checked={formData.nose.condition === option}
                  onCheckedChange={(checked) => handleConditionChange(option, checked as boolean)}
                />
                <Label htmlFor={`condition-${option}`} className="capitalize">
                  {option}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Intensity</Label>
          <div className="grid grid-cols-3 gap-2">
            {intensityOptions.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <Checkbox
                  id={`intensity-${option}`}
                  checked={formData.nose.intensity === option}
                  onCheckedChange={(checked) => handleIntensityChange(option, checked as boolean)}
                />
                <Label htmlFor={`intensity-${option}`} className="capitalize">
                  {option}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Aroma Characteristics</Label>
          <Textarea
            value={formData.nose.aromaCharacteristics}
            onChange={(e) =>
              onUpdate({
                nose: { ...formData.nose, aromaCharacteristics: e.target.value }
              })
            }
            placeholder="Describe the aromas..."
          />
        </div>

        <div className="space-y-2">
          <Label>Development</Label>
          <div className="grid grid-cols-2 gap-2">
            {developmentOptions.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <Checkbox
                  id={`development-${option}`}
                  checked={formData.nose.development === option}
                  onCheckedChange={(checked) => handleDevelopmentChange(option, checked as boolean)}
                />
                <Label htmlFor={`development-${option}`} className="capitalize">
                  {option}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
