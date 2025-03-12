
import { useState } from "react";
import { WineFormData } from "../types";

/**
 * Hook to manage wine form state
 * @param initialData Optional initial data for the form
 * @returns Form state and handlers
 */
export const useWineForm = (initialData?: WineFormData) => {
  const [rating, setRating] = useState(initialData?.rating || 0);
  
  const [formData, setFormData] = useState<WineFormData>({
    name: initialData?.name || "",
    producer: initialData?.producer || "",
    region: initialData?.region || "",
    country: initialData?.country || "",
    appellation: initialData?.appellation || "",
    vintage: initialData?.vintage ?? new Date().getFullYear(),
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

  const resetForm = () => {
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
  };

  return {
    formData,
    rating,
    setRating,
    handleFormUpdate,
    resetForm
  };
};
