
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
    vintage: initialData?.vintage || new Date().getFullYear(),
    price: initialData?.price || 0,
    type: initialData?.type || "red",
    alcoholLevel: initialData?.alcoholLevel || 12,
    grapeVariety: initialData?.grapeVariety || [],
    rating: initialData?.rating || 0,
    appearance: initialData?.appearance || {
      clarity: "clear",
      intensity: "medium",
      colours: [],
    },
    nose: initialData?.nose || {
      condition: "clean",
      intensity: "medium",
      aromaCharacteristics: "",
      development: "youthful",
    },
    palate: initialData?.palate || {
      sweetness: "dry",
      acidity: "medium",
      tannin: "medium",
      alcohol: "medium",
      body: "medium",
      flavourIntensity: "medium",
      finish: "medium",
    },
    notes: initialData?.notes || ""
  });

  const handleFormUpdate = (updates: Partial<WineFormData>) => {
    setFormData(prev => ({
      ...prev,
      ...updates
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.producer || !formData.region || !formData.grapeVariety.length) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    onSubmit({ ...formData, rating });
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
        clarity: "clear",
        intensity: "medium",
        colours: [],
      },
      nose: {
        condition: "clean",
        intensity: "medium",
        aromaCharacteristics: "",
        development: "youthful",
      },
      palate: {
        sweetness: "dry",
        acidity: "medium",
        tannin: "medium",
        alcohol: "medium",
        body: "medium",
        flavourIntensity: "medium",
        finish: "medium",
      },
    });
    setRating(0);
    toast({
      title: "Wine Added",
      description: "Your wine has been added to the collection.",
    });
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
