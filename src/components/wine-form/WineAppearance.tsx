import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { WineFormData } from "./types";

interface WineAppearanceProps {
  formData: WineFormData;
  onUpdate: (updates: Partial<WineFormData>) => void;
}

export const WineAppearance = ({ formData, onUpdate }: WineAppearanceProps) => {
  const wineColourOptions = {
    white: ["lemon-green", "lemon", "gold", "amber", "brown"],
    rosé: ["pink", "salmon", "orange"],
    red: ["purple", "ruby", "garnet", "tawny", "brown"]
  };

  const handleColourChange = (colour: string, isChecked: boolean) => {
    const newColours = isChecked 
      ? [...formData.appearance.colours, colour]
      : formData.appearance.colours.filter(c => c !== colour);
    
    onUpdate({
      appearance: {
        ...formData.appearance,
        colours: newColours
      }
    });
  };

  return (
    <div>
      <h4 className="font-medium mb-2">Appearance</h4>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Clarity</Label>
          <Select
            value={formData.appearance.clarity}
            onValueChange={(value: any) => 
              onUpdate({ 
                appearance: { ...formData.appearance, clarity: value }
              })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="clear">Clear</SelectItem>
              <SelectItem value="hazy">Hazy</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Intensity</Label>
          <Select
            value={formData.appearance.intensity}
            onValueChange={(value: any) =>
              onUpdate({
                appearance: { ...formData.appearance, intensity: value }
              })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pale">Pale</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="deep">Deep</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2 mt-4">
        <Label>Colours</Label>
        <div className="grid grid-cols-3 gap-2">
          {formData.type === "white" && (
            <div className="space-y-2 border rounded-lg p-3">
              <h5 className="font-medium mb-2">White Wine Colours</h5>
              {wineColourOptions.white.map((colour) => (
                <div key={colour} className="flex items-center space-x-2">
                  <Checkbox
                    id={colour}
                    checked={formData.appearance.colours.includes(colour)}
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
                    checked={formData.appearance.colours.includes(colour)}
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
                    checked={formData.appearance.colours.includes(colour)}
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
  );
};