import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { WineFormData } from "./types";

interface WineAppearanceProps {
  formData: WineFormData;
  onUpdate: (updates: Partial<WineFormData>) => void;
}

export const WineAppearance = ({ formData, onUpdate }: WineAppearanceProps) => {
  const wineColourOptions = {
    white: ["Lemon-Green", "Lemon", "Gold", "Amber", "Brown"],
    rosé: ["Pink", "Salmon", "Orange"],
    red: ["Purple", "Ruby", "Garnet", "Tawny", "Brown"]
  };

  const clarityOptions = ["clear", "hazy"];
  const intensityOptions = ["pale", "medium", "deep"];

  const handleColourChange = (colour: string, isChecked: boolean) => {
    const newColours = isChecked 
      ? [...formData.appearance.colours, colour.toLowerCase()]
      : formData.appearance.colours.filter(c => c !== colour.toLowerCase());
    
    onUpdate({
      appearance: {
        ...formData.appearance,
        colours: newColours
      }
    });
  };

  const handleClarityChange = (value: string, isChecked: boolean) => {
    if (isChecked) {
      onUpdate({
        appearance: {
          ...formData.appearance,
          clarity: value as "clear" | "hazy"
        }
      });
    }
  };

  const handleIntensityChange = (value: string, isChecked: boolean) => {
    if (isChecked) {
      onUpdate({
        appearance: {
          ...formData.appearance,
          intensity: value as "pale" | "medium" | "deep"
        }
      });
    }
  };

  return (
    <div>
      <h4 className="font-medium mb-2">Appearance</h4>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Clarity</Label>
          <div className="flex gap-4">
            {clarityOptions.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <Checkbox
                  id={`clarity-${option}`}
                  checked={formData.appearance.clarity === option}
                  onCheckedChange={(checked) => handleClarityChange(option, checked as boolean)}
                />
                <Label htmlFor={`clarity-${option}`} className="capitalize">
                  {option}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Intensity</Label>
          <div className="flex gap-4">
            {intensityOptions.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <Checkbox
                  id={`intensity-${option}`}
                  checked={formData.appearance.intensity === option}
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
          <Label>Colours</Label>
          <div className="grid grid-cols-3 gap-2">
            {formData.type === "white" && (
              <div className="space-y-2 border rounded-lg p-3">
                <h5 className="font-medium mb-2">White Wine Colours</h5>
                {wineColourOptions.white.map((colour) => (
                  <div key={colour} className="flex items-center space-x-2">
                    <Checkbox
                      id={colour}
                      checked={formData.appearance.colours.includes(colour.toLowerCase())}
                      onCheckedChange={(checked) => handleColourChange(colour, checked as boolean)}
                    />
                    <Label htmlFor={colour} className="cursor-pointer">{colour}</Label>
                  </div>
                ))}
              </div>
            )}
            {formData.type === "rosé" && (
              <div className="space-y-2 border rounded-lg p-3">
                <h5 className="font-medium mb-2">Rosé Wine Colours</h5>
                {wineColourOptions.rosé.map((colour) => (
                  <div key={colour} className="flex items-center space-x-2">
                    <Checkbox
                      id={colour}
                      checked={formData.appearance.colours.includes(colour.toLowerCase())}
                      onCheckedChange={(checked) => handleColourChange(colour, checked as boolean)}
                    />
                    <Label htmlFor={colour} className="cursor-pointer">{colour}</Label>
                  </div>
                ))}
              </div>
            )}
            {formData.type === "red" && (
              <div className="space-y-2 border rounded-lg p-3">
                <h5 className="font-medium mb-2">Red Wine Colours</h5>
                {wineColourOptions.red.map((colour) => (
                  <div key={colour} className="flex items-center space-x-2">
                    <Checkbox
                      id={colour}
                      checked={formData.appearance.colours.includes(colour.toLowerCase())}
                      onCheckedChange={(checked) => handleColourChange(colour, checked as boolean)}
                    />
                    <Label htmlFor={colour} className="cursor-pointer">{colour}</Label>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};