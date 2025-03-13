
import { WineFormData } from "./types";
import { ClaritySection } from "./appearance/ClaritySection";
import { IntensitySection } from "./appearance/IntensitySection";
import { ColoursSection } from "./appearance/ColoursSection";

interface WineAppearanceProps {
  formData: WineFormData;
  onUpdate: (updates: Partial<WineFormData>) => void;
}

export const WineAppearance = ({ formData, onUpdate }: WineAppearanceProps) => {
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
        <ClaritySection 
          clarity={formData.appearance.clarity}
          onClarityChange={handleClarityChange}
        />
        <IntensitySection 
          intensity={formData.appearance.intensity}
          onIntensityChange={handleIntensityChange}
        />
        <ColoursSection 
          wineType={formData.type}
          colours={formData.appearance.colours}
          onColourChange={handleColourChange}
        />
      </div>
    </div>
  );
};
