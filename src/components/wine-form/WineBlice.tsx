
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { WineFormData } from "./types";
import { useEffect, useState } from "react";

interface WineBliceProps {
  formData: WineFormData;
  onUpdate: (updates: Partial<WineFormData>) => void;
  onRatingChange: (rating: number) => void;
}

export const WineBlice = ({ formData, onUpdate, onRatingChange }: WineBliceProps) => {
  const [bliceValues, setBliceValues] = useState({
    balance: formData.blice?.balance || 0,
    length: formData.blice?.length || 0,
    intensity: formData.blice?.intensity || 0,
    complexity: formData.blice?.complexity || 0,
    enjoyment: formData.blice?.enjoyment || 0
  });

  // Calculate total based on BLICE values
  useEffect(() => {
    const total = Object.values(bliceValues).reduce((sum, value) => sum + value, 0);
    onRatingChange(total);
    
    onUpdate({
      blice: bliceValues
    });
  }, [bliceValues, onUpdate, onRatingChange]);

  const handleValueChange = (key: keyof typeof bliceValues, value: number[]) => {
    setBliceValues(prev => ({
      ...prev,
      [key]: parseFloat(value[0].toFixed(1))
    }));
  };

  const renderSlider = (label: string, key: keyof typeof bliceValues) => (
    <div className="space-y-2">
      <div className="flex justify-between">
        <Label>{label}</Label>
        <span className="text-sm">{bliceValues[key].toFixed(1)}</span>
      </div>
      <Slider
        value={[bliceValues[key]]}
        min={0}
        max={1}
        step={0.1}
        onValueChange={(value) => handleValueChange(key, value)}
      />
    </div>
  );

  return (
    <div className="space-y-4">
      <h3 className="font-semibold">BLICE Rating</h3>
      
      {renderSlider("Balance", "balance")}
      {renderSlider("Length", "length")}
      {renderSlider("Intensity", "intensity")}
      {renderSlider("Complexity", "complexity")}
      {renderSlider("Enjoyment", "enjoyment")}
    </div>
  );
};
