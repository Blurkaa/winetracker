import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { BasicWineInfo } from "./BasicWineInfo";
import { WineRating } from "./WineRating";
import { WineAppearance } from "./WineAppearance";
import { WineNose } from "./WineNose";
import { WinePalate } from "./WinePalate";
import { WineImage } from "./WineImage";
import { WineFormData } from "./types";

interface AddWineFormProps {
  onSubmit: (wine: WineFormData) => void;
}

export const AddWineForm = ({ onSubmit }: AddWineFormProps) => {
  const { toast } = useToast();
  const [rating, setRating] = useState(0);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  
  const [formData, setFormData] = useState<WineFormData>({
    name: "",
    producer: "",
    region: "",
    country: "",
    appellation: "",
    vintage: new Date().getFullYear(),
    price: 0,
    type: "red",
    alcoholLevel: 12,
    grapeVariety: "",
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.producer || !formData.region || !formData.grapeVariety) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    let imageUrl;
    if (selectedImage) {
      imageUrl = URL.createObjectURL(selectedImage);
    }

    onSubmit({ ...formData, rating, imageUrl });
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
      grapeVariety: "",
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
    setSelectedImage(null);
    toast({
      title: "Wine Added",
      description: "Your wine has been added to the collection.",
    });
  };

  const handleFormUpdate = (updates: Partial<WineFormData>) => {
    setFormData(prev => ({
      ...prev,
      ...updates
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <BasicWineInfo formData={formData} onUpdate={handleFormUpdate} />
      <WineRating rating={rating} onRatingChange={setRating} />
      
      <div className="border-t pt-4 mt-4">
        <h3 className="font-semibold mb-4">WSET Evaluation</h3>
        <div className="space-y-4">
          <WineAppearance formData={formData} onUpdate={handleFormUpdate} />
          <WineNose formData={formData} onUpdate={handleFormUpdate} />
          <WinePalate formData={formData} onUpdate={handleFormUpdate} />
        </div>
      </div>

      <WineImage selectedImage={selectedImage} onImageChange={handleImageChange} />

      <div className="space-y-2">
        <Label htmlFor="notes">Additional Notes</Label>
        <Textarea
          id="notes"
          value={formData.notes}
          onChange={(e) => handleFormUpdate({ notes: e.target.value })}
          placeholder="Add your additional notes..."
          className="h-24"
        />
      </div>

      <Button type="submit" className="w-full bg-wine hover:bg-wine-light">
        Add Wine
      </Button>
    </form>
  );
};