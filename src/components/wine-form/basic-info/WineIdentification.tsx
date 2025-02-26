
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { WineFormData } from "../types";

interface WineIdentificationProps {
  name: string;
  producer: string;
  onUpdate: (updates: Partial<WineFormData>) => void;
}

export const WineIdentification = ({ name, producer, onUpdate }: WineIdentificationProps) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="name">Wine Name *</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => onUpdate({ name: e.target.value })}
          placeholder="e.g. Château Margaux"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="producer">Producer *</Label>
        <Input
          id="producer"
          value={producer}
          onChange={(e) => onUpdate({ producer: e.target.value })}
          placeholder="e.g. Château Margaux"
        />
      </div>
    </>
  );
};
