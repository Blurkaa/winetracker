
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { WineFormData } from "../types";
import { CountryCombobox } from "@/components/wine/filters/CountryCombobox";
import { RegionCombobox } from "@/components/wine/filters/RegionCombobox";

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
          <CountryCombobox
            value={country}
            onChange={(value) => onUpdate({ country: value })}
            placeholder="Select country"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="region">Region *</Label>
          <RegionCombobox
            value={region}
            onChange={(value) => onUpdate({ region: value })}
            placeholder="Select region"
            country={country}
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
