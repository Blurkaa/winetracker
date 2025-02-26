
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { WineFormData } from "../types";

interface WineOriginProps {
  country: string;
  region: string;
  appellation: string;
  onUpdate: (updates: Partial<WineFormData>) => void;
}

export const WineOrigin = ({ country, region, appellation, onUpdate }: WineOriginProps) => {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="country">Country *</Label>
          <Input
            id="country"
            value={country}
            onChange={(e) => onUpdate({ country: e.target.value })}
            placeholder="e.g. France"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="region">Region *</Label>
          <Input
            id="region"
            value={region}
            onChange={(e) => onUpdate({ region: e.target.value })}
            placeholder="e.g. Bordeaux"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="appellation">Appellation</Label>
        <Input
          id="appellation"
          value={appellation}
          onChange={(e) => onUpdate({ appellation: e.target.value })}
          placeholder="e.g. Margaux AOC"
        />
      </div>
    </>
  );
};
