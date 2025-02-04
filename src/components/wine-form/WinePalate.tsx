import { WineFormData } from "./types";
import { SweetnessSection } from "./palate/SweetnessSection";
import { IntensityBasedSection } from "./palate/IntensityBasedSection";
import { MousseSection } from "./palate/MousseSection";

interface WinePalateProps {
  formData: WineFormData;
  onUpdate: (updates: Partial<WineFormData>) => void;
}

export const WinePalate = ({ formData, onUpdate }: WinePalateProps) => {
  const handlePalateChange = (field: keyof WineFormData['palate'], value: string, isChecked: boolean) => {
    if (isChecked) {
      onUpdate({
        palate: {
          ...formData.palate,
          [field]: value
        }
      });
    }
  };

  const alcoholLabels = {
    "low": "Low (<11%)",
    "medium": "Medium (11-13.9%)",
    "high": "High (>14%)"
  };

  return (
    <div>
      <h4 className="font-medium mb-2">Palate</h4>
      <div className="space-y-4">
        <SweetnessSection
          sweetness={formData.palate.sweetness}
          onSweetnessChange={(value, checked) => handlePalateChange('sweetness', value, checked)}
        />
        
        <IntensityBasedSection
          label="Acidity"
          value={formData.palate.acidity}
          onChange={(value, checked) => handlePalateChange('acidity', value, checked)}
        />

        <IntensityBasedSection
          label="Tannin"
          value={formData.palate.tannin}
          onChange={(value, checked) => handlePalateChange('tannin', value, checked)}
        />

        <IntensityBasedSection
          label="Body"
          value={formData.palate.body}
          onChange={(value, checked) => handlePalateChange('body', value, checked)}
          options={["light", "medium-", "medium", "medium+", "full"]}
        />

        <IntensityBasedSection
          label="Alcohol Level"
          value={formData.palate.alcohol}
          onChange={(value, checked) => handlePalateChange('alcohol', value, checked)}
          options={["low", "medium", "high"]}
          customLabels={alcoholLabels}
        />

        {formData.type === "sparkling" && (
          <MousseSection
            mousse={formData.palate.mousse}
            onMousseChange={(value, checked) => handlePalateChange('mousse', value, checked)}
          />
        )}

        <IntensityBasedSection
          label="Flavour Intensity"
          value={formData.palate.flavourIntensity}
          onChange={(value, checked) => handlePalateChange('flavourIntensity', value, checked)}
        />

        <IntensityBasedSection
          label="Finish"
          value={formData.palate.finish}
          onChange={(value, checked) => handlePalateChange('finish', value, checked)}
          options={["short", "medium-", "medium", "medium+", "long"]}
        />
      </div>
    </div>
  );
};