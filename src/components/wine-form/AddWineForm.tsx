
import { WineFormData } from "./types";
import { useWineForm } from "./hooks/useWineForm";
import { WineFormSubmitHandler } from "./WineFormSubmitHandler";
import { BasicWineInfo } from "./BasicWineInfo";
import { WineRating } from "./WineRating";
import { WineAppearance } from "./WineAppearance";
import { WineNose } from "./WineNose";
import { WinePalate } from "./WinePalate";
import { WineNotes } from "./WineNotes";
import { WineSubmitButton } from "./WineSubmitButton";

interface AddWineFormProps {
  onSubmit: (wine: WineFormData) => void;
  initialData?: WineFormData;
}

export const AddWineForm = ({ onSubmit, initialData }: AddWineFormProps) => {
  const { formData, rating, setRating, handleFormUpdate, resetForm } = useWineForm(initialData);

  return (
    <WineFormSubmitHandler
      formData={formData}
      rating={rating}
      onSubmit={onSubmit}
      resetForm={resetForm}
      initialData={initialData}
    >
      <BasicWineInfo formData={formData} onUpdate={handleFormUpdate} />
      
      <div className="space-y-2">
        <WineRating rating={rating} onRatingChange={setRating} />
      </div>

      <div className="border-t pt-4 mt-4">
        <h3 className="font-semibold mb-4">WSET Evaluation</h3>
        
        <div className="space-y-4">
          <WineAppearance formData={formData} onUpdate={handleFormUpdate} />
          <WineNose formData={formData} onUpdate={handleFormUpdate} />
          <WinePalate formData={formData} onUpdate={handleFormUpdate} />
        </div>
      </div>

      <WineNotes notes={formData.notes || ""} onUpdate={handleFormUpdate} />
      <WineSubmitButton label={initialData ? "Save Changes" : "Add Wine"} />
    </WineFormSubmitHandler>
  );
};
