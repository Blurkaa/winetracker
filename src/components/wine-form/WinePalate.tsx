import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { WineFormData } from "./types";

interface WinePalateProps {
  formData: WineFormData;
  onUpdate: (updates: Partial<WineFormData>) => void;
}

export const WinePalate = ({ formData, onUpdate }: WinePalateProps) => {
  const sweetnessOptions = ["dry", "off-dry", "medium-dry", "medium-sweet", "sweet", "luscious"];
  const intensityOptions = ["low", "medium-", "medium", "medium+", "high"];
  const bodyOptions = ["light", "medium-", "medium", "medium+", "full"];
  const alcoholOptions = ["low", "medium", "high"];
  const mousseOptions = ["delicate", "creamy", "aggressive"];
  const finishOptions = ["short", "medium-", "medium", "medium+", "long"];

  const handleSweetnessChange = (value: string, isChecked: boolean) => {
    if (isChecked) {
      onUpdate({
        palate: { ...formData.palate, sweetness: value as WineFormData['palate']['sweetness'] }
      });
    }
  };

  const handleAcidityChange = (value: string, isChecked: boolean) => {
    if (isChecked) {
      onUpdate({
        palate: { ...formData.palate, acidity: value as WineFormData['palate']['acidity'] }
      });
    }
  };

  const handleTanninChange = (value: string, isChecked: boolean) => {
    if (isChecked) {
      onUpdate({
        palate: { ...formData.palate, tannin: value as WineFormData['palate']['tannin'] }
      });
    }
  };

  const handleBodyChange = (value: string, isChecked: boolean) => {
    if (isChecked) {
      onUpdate({
        palate: { ...formData.palate, body: value as WineFormData['palate']['body'] }
      });
    }
  };

  const handleAlcoholChange = (value: string, isChecked: boolean) => {
    if (isChecked) {
      onUpdate({
        palate: { ...formData.palate, alcohol: value as WineFormData['palate']['alcohol'] }
      });
    }
  };

  const handleMousseChange = (value: string, isChecked: boolean) => {
    if (isChecked) {
      onUpdate({
        palate: { ...formData.palate, mousse: value as WineFormData['palate']['mousse'] }
      });
    }
  };

  const handleFlavourIntensityChange = (value: string, isChecked: boolean) => {
    if (isChecked) {
      onUpdate({
        palate: { ...formData.palate, flavourIntensity: value as WineFormData['palate']['flavourIntensity'] }
      });
    }
  };

  const handleFinishChange = (value: string, isChecked: boolean) => {
    if (isChecked) {
      onUpdate({
        palate: { ...formData.palate, finish: value as WineFormData['palate']['finish'] }
      });
    }
  };

  return (
    <div>
      <h4 className="font-medium mb-2">Palate</h4>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Sweetness</Label>
          <div className="grid grid-cols-2 gap-2">
            {sweetnessOptions.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <Checkbox
                  id={`sweetness-${option}`}
                  checked={formData.palate.sweetness === option}
                  onCheckedChange={(checked) => handleSweetnessChange(option, checked as boolean)}
                />
                <Label htmlFor={`sweetness-${option}`} className="capitalize">
                  {option}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Acidity</Label>
          <div className="grid grid-cols-3 gap-2">
            {intensityOptions.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <Checkbox
                  id={`acidity-${option}`}
                  checked={formData.palate.acidity === option}
                  onCheckedChange={(checked) => handleAcidityChange(option, checked as boolean)}
                />
                <Label htmlFor={`acidity-${option}`} className="capitalize">
                  {option}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Tannin</Label>
          <div className="grid grid-cols-3 gap-2">
            {intensityOptions.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <Checkbox
                  id={`tannin-${option}`}
                  checked={formData.palate.tannin === option}
                  onCheckedChange={(checked) => handleTanninChange(option, checked as boolean)}
                />
                <Label htmlFor={`tannin-${option}`} className="capitalize">
                  {option}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Body</Label>
          <div className="grid grid-cols-3 gap-2">
            {bodyOptions.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <Checkbox
                  id={`body-${option}`}
                  checked={formData.palate.body === option}
                  onCheckedChange={(checked) => handleBodyChange(option, checked as boolean)}
                />
                <Label htmlFor={`body-${option}`} className="capitalize">
                  {option}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Alcohol Level</Label>
          <div className="grid grid-cols-3 gap-2">
            {alcoholOptions.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <Checkbox
                  id={`alcohol-${option}`}
                  checked={formData.palate.alcohol === option}
                  onCheckedChange={(checked) => handleAlcoholChange(option, checked as boolean)}
                />
                <Label htmlFor={`alcohol-${option}`} className="capitalize">
                  {option === "low" ? "Low (<11%)" : option === "medium" ? "Medium (11-13.9%)" : "High (>14%)"}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {formData.type === "sparkling" && (
          <div className="space-y-2">
            <Label>Mousse</Label>
            <div className="grid grid-cols-3 gap-2">
              {mousseOptions.map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <Checkbox
                    id={`mousse-${option}`}
                    checked={formData.palate.mousse === option}
                    onCheckedChange={(checked) => handleMousseChange(option, checked as boolean)}
                  />
                  <Label htmlFor={`mousse-${option}`} className="capitalize">
                    {option}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-2">
          <Label>Flavour Intensity</Label>
          <div className="grid grid-cols-3 gap-2">
            {intensityOptions.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <Checkbox
                  id={`flavourIntensity-${option}`}
                  checked={formData.palate.flavourIntensity === option}
                  onCheckedChange={(checked) => handleFlavourIntensityChange(option, checked as boolean)}
                />
                <Label htmlFor={`flavourIntensity-${option}`} className="capitalize">
                  {option}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Finish</Label>
          <div className="grid grid-cols-3 gap-2">
            {finishOptions.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <Checkbox
                  id={`finish-${option}`}
                  checked={formData.palate.finish === option}
                  onCheckedChange={(checked) => handleFinishChange(option, checked as boolean)}
                />
                <Label htmlFor={`finish-${option}`} className="capitalize">
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