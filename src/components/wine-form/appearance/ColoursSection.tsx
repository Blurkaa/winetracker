
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { WineFormData } from "../types";

interface ColoursSectionProps {
  wineType: WineFormData['type'];
  colours: string[];
  onColourChange: (colour: string, isChecked: boolean) => void;
}

export const ColoursSection = ({ wineType, colours, onColourChange }: ColoursSectionProps) => {
  const wineColourOptions = {
    white: ["Lemon-Green", "Lemon", "Gold", "Amber", "Brown"],
    rosé: ["Pink", "Salmon", "Orange"],
    red: ["Purple", "Ruby", "Garnet", "Tawny", "Brown"]
  };

  const getColourOptions = () => {
    switch (wineType) {
      case 'white':
      case 'sparkling':
        return { title: `${wineType === 'white' ? 'White' : 'Sparkling'} Wine Colours`, options: wineColourOptions.white };
      case 'rosé':
        return { title: 'Rosé Wine Colours', options: wineColourOptions.rosé };
      case 'red':
        return { title: 'Red Wine Colours', options: wineColourOptions.red };
      default:
        return { title: '', options: [] };
    }
  };

  const { title, options } = getColourOptions();

  if (!options.length) return null;

  return (
    <div className="space-y-2">
      <Label>Colours</Label>
      <div className="grid grid-cols-3 gap-2">
        <div className="space-y-2 border rounded-lg p-3">
          <h5 className="font-medium mb-2">{title}</h5>
          {options.map((colour) => (
            <div key={colour} className="flex items-center space-x-2">
              <Checkbox
                id={colour}
                checked={colours.includes(colour.toLowerCase())}
                onCheckedChange={(checked) => onColourChange(colour, checked as boolean)}
              />
              <Label htmlFor={colour} className="cursor-pointer">{colour}</Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
