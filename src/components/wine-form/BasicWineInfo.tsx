
import { WineFormData } from "./types";
import { WineIdentification } from "./basic-info/WineIdentification";
import { WineOrigin } from "./basic-info/WineOrigin";
import { WineDetails } from "./basic-info/WineDetails";
import { GrapeVarieties } from "./basic-info/GrapeVarieties";

interface BasicWineInfoProps {
  formData: WineFormData;
  onUpdate: (updates: Partial<WineFormData>) => void;
}

export const BasicWineInfo = ({ formData, onUpdate }: BasicWineInfoProps) => {
  return (
    <div className="space-y-4">
      <WineIdentification
        name={formData.name}
        producer={formData.producer}
        onUpdate={onUpdate}
      />
      
      <WineOrigin
        country={formData.country}
        region={formData.region}
        appellation={formData.appellation}
        onUpdate={onUpdate}
      />
      
      <WineDetails
        vintage={formData.vintage}
        price={formData.price}
        type={formData.type}
        alcoholLevel={formData.alcoholLevel}
        onUpdate={onUpdate}
      />
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <GrapeVarieties
            grapeVariety={formData.grapeVariety}
            onUpdate={onUpdate}
          />
        </div>
      </div>
    </div>
  );
};
