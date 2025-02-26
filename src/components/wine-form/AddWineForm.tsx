
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { WineFormData } from "./types";
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
  const { toast } = useToast();
  const [rating, setRating] = useState(initialData?.rating || 0);
  
  const [formData, setFormData] = useState<WineFormData>({
    name: initialData?.name || "",
    producer: initialData?.producer || "",
    region: initialData?.region || "",
    country: initialData?.country || "",
    appellation: initialData?.appellation || "",
    vintage: initialData?.vintage ?? new Date().getFullYear(), // Use nullish coalescing to allow 0 or undefined
    price: initialData?.price || 0,
    type: initialData?.type || "red",
    alcoholLevel: initialData?.alcoholLevel || 12,
    grapeVariety: initialData?.grapeVariety || [],
    rating: initialData?.rating || 0,
    appearance: initialData?.appearance || {
      clarity: undefined,
      intensity: undefined,
      colours: [],
    },
    nose: initialData?.nose || {
      condition: undefined,
      intensity: undefined,
      aromaCharacteristics: "",
      development: undefined,
    },
    palate: initialData?.palate || {
      sweetness: undefined,
      acidity: undefined,
      tannin: undefined,
      alcohol: undefined,
      body: undefined,
      flavourIntensity: undefined,
      finish: undefined,
    },
    notes: initialData?.notes || "",
    ...(initialData?.id ? { id: initialData.id } : {})
  });

  const handleFormUpdate = (updates: Partial<WineFormData>) => {
    setFormData(prev => ({
      ...prev,
      ...updates
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check required fields
    const requiredFields = {
      basic: {
        name: "Name",
        producer: "Producer",
        region: "Region",
        country: "Country",
      },
      grapeVariety: "Grape variety",
      appearance: {
        clarity: "Clarity",
        intensity: "Intensity"
      },
      nose: {
        condition: "Nose condition",
        intensity: "Nose intensity",
        development: "Development"
      },
      palate: {
        sweetness: "Sweetness",
        acidity: "Acidity",
        tannin: "Tannin",
        alcohol: "Alcohol",
        body: "Body",
        flavourIntensity: "Flavour intensity",
        finish: "Finish"
      }
    };

    // Check basic fields
    const missingBasicFields = Object.entries(requiredFields.basic)
      .filter(([key]) => !formData[key as keyof typeof formData])
      .map(([_, label]) => label);

    // Check grape variety
    if (formData.grapeVariety.length === 0) {
      missingBasicFields.push(requiredFields.grapeVariety);
    }

    // Check appearance fields
    const missingAppearanceFields = Object.entries(requiredFields.appearance)
      .filter(([key]) => !formData.appearance[key as keyof typeof formData.appearance])
      .map(([_, label]) => label);

    // Check nose fields
    const missingNoseFields = Object.entries(requiredFields.nose)
      .filter(([key]) => !formData.nose[key as keyof typeof formData.nose])
      .map(([_, label]) => label);

    // Check palate fields
    const missingPalateFields = Object.entries(requiredFields.palate)
      .filter(([key]) => !formData.palate[key as keyof typeof formData.palate])
      .map(([_, label]) => label);

    const allMissingFields = [
      ...missingBasicFields,
      ...missingAppearanceFields,
      ...missingNoseFields,
      ...missingPalateFields
    ];

    if (allMissingFields.length > 0) {
      toast({
        title: "Missing Required Fields",
        description: `Please fill in the following fields: ${allMissingFields.join(", ")}`,
        variant: "destructive",
      });
      return;
    }

    onSubmit({ ...formData, rating });
    
    if (!initialData) {
      setFormData({
        name: "",
        producer: "",
        region: "",
        country: "",
        appellation: "",
        vintage: new Date().getFullYear(),
        price: 0,
        type: "red",
        alcoholLevel: 12,
        grapeVariety: [],
        rating: 0,
        appearance: {
          clarity: undefined,
          intensity: undefined,
          colours: [],
        },
        nose: {
          condition: undefined,
          intensity: undefined,
          aromaCharacteristics: "",
          development: undefined,
        },
        palate: {
          sweetness: undefined,
          acidity: undefined,
          tannin: undefined,
          alcohol: undefined,
          body: undefined,
          flavourIntensity: undefined,
          finish: undefined,
        },
        notes: "",
      });
      setRating(0);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
    </form>
  );
};
