import { Star } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface WineCardProps {
  wine: {
    name: string;
    producer: string;
    region: string;
    vintage: number;
    alcoholLevel: number;
    grapeVariety: string;
    rating: number;
    notes?: string;
  };
}

export const WineCard = ({ wine }: WineCardProps) => {
  return (
    <Card className="wine-card">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-playfair text-xl font-semibold text-wine">{wine.name}</h3>
            <p className="text-sm text-muted-foreground">{wine.producer}</p>
          </div>
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                className={`rating-star ${i < wine.rating ? "fill-gold" : "fill-none text-gray-300"}`}
              />
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Region:</span>
            <span className="font-medium">{wine.region}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Vintage:</span>
            <span className="font-medium">{wine.vintage}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Alcohol:</span>
            <span className="font-medium">{wine.alcoholLevel}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Grape:</span>
            <span className="font-medium">{wine.grapeVariety}</span>
          </div>
          {wine.notes && (
            <p className="text-muted-foreground mt-2 italic">{wine.notes}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};