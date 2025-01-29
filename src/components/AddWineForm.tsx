import { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

interface WineFormData {
  name: string;
  producer: string;
  region: string;
  vintage: number;
  alcoholLevel: number;
  grapeVariety: string;
  rating: number;
  notes?: string;
}

interface AddWineFormProps {
  onSubmit: (wine: WineFormData) => void;
}

export const AddWineForm = ({ onSubmit }: AddWineFormProps) => {
  const { toast } = useToast();
  const [rating, setRating] = useState(0);
  const [formData, setFormData] = useState<WineFormData>({
    name: "",
    producer: "",
    region: "",
    vintage: new Date().getFullYear(),
    alcoholLevel: 12,
    grapeVariety: "",
    rating: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.producer || !formData.region || !formData.grapeVariety) {
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
      vintage: new Date().getFullYear(),
      alcoholLevel: 12,
      grapeVariety: "",
      rating: 0,
    });
    setRating(0);
    toast({
      title: "Wine Added",
      description: "Your wine has been added to the collection.",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Wine Name *</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="e.g. Château Margaux"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="producer">Producer *</Label>
        <Input
          id="producer"
          value={formData.producer}
          onChange={(e) => setFormData({ ...formData, producer: e.target.value })}
          placeholder="e.g. Château Margaux"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="region">Region *</Label>
        <Input
          id="region"
          value={formData.region}
          onChange={(e) => setFormData({ ...formData, region: e.target.value })}
          placeholder="e.g. Bordeaux"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="vintage">Vintage</Label>
          <Input
            id="vintage"
            type="number"
            value={formData.vintage}
            onChange={(e) => setFormData({ ...formData, vintage: Number(e.target.value) })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="alcoholLevel">Alcohol %</Label>
          <Input
            id="alcoholLevel"
            type="number"
            step="0.1"
            value={formData.alcoholLevel}
            onChange={(e) => setFormData({ ...formData, alcoholLevel: Number(e.target.value) })}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="grapeVariety">Grape Variety *</Label>
        <Input
          id="grapeVariety"
          value={formData.grapeVariety}
          onChange={(e) => setFormData({ ...formData, grapeVariety: e.target.value })}
          placeholder="e.g. Cabernet Sauvignon"
        />
      </div>

      <div className="space-y-2">
        <Label>Rating</Label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className="focus:outline-none"
            >
              <Star
                size={24}
                className={`rating-star ${
                  star <= rating ? "fill-gold" : "fill-none text-gray-300"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          placeholder="Add your tasting notes..."
          className="h-24"
        />
      </div>

      <Button type="submit" className="w-full bg-wine hover:bg-wine-light">
        Add Wine
      </Button>
    </form>
  );
};