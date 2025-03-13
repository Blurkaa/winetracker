
import { Star, StarHalf } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { WineDetailsDialog } from "@/components/wine/WineDetailsDialog";
import { useState, memo } from "react";
import { WineFormData } from "./wine-form/types";

interface WineCardProps {
  wine: WineFormData;
}

const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const WineCard = memo(({ wine }: WineCardProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const renderStar = (position: number) => {
    const isHalfStar = wine.rating === position - 0.5;
    const isFullStar = wine.rating >= position;
    
    return (
      <div key={position} className="w-4 h-4">
        {isHalfStar ? (
          <StarHalf
            size={16}
            className="rating-star fill-gold"
          />
        ) : (
          <Star
            size={16}
            className={`rating-star ${
              isFullStar ? "fill-gold" : "fill-none text-gray-300"
            }`}
          />
        )}
      </div>
    );
  };

  return (
    <>
      <Card 
        className="wine-card cursor-pointer" 
        onClick={() => setIsDialogOpen(true)}
      >
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-playfair text-xl font-semibold text-wine">{wine.name}</h3>
              <p className="text-sm text-muted-foreground">{wine.producer}</p>
            </div>
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((position) => renderStar(position))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-muted-foreground">Type:</span>
                <span className="font-medium ml-2">{capitalizeFirstLetter(wine.type)}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Price:</span>
                <span className="font-medium ml-2">{wine.price ? `€${wine.price}` : 'N/A'}</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-muted-foreground">Region:</span>
                <span className="font-medium ml-2">{wine.region}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Country:</span>
                <span className="font-medium ml-2">{wine.country}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-muted-foreground">Vintage:</span>
                <span className="font-medium ml-2">{wine.vintage || 'N/A'}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Alcohol:</span>
                <span className="font-medium ml-2">{wine.alcoholLevel ? `${wine.alcoholLevel}%` : 'N/A'}</span>
              </div>
            </div>

            <div>
              <span className="text-muted-foreground">Grape Varieties:</span>
              <span className="font-medium ml-2">{wine.grapeVariety.join(", ")}</span>
            </div>

            {wine.nose.aromaCharacteristics && (
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Aromas</h4>
                <p className="italic">{wine.nose.aromaCharacteristics}</p>
              </div>
            )}

            {wine.notes && (
              <p className="text-muted-foreground mt-4 italic">{wine.notes}</p>
            )}
          </div>
        </CardContent>
      </Card>

      <WineDetailsDialog 
        wine={wine} 
        isOpen={isDialogOpen} 
        onOpenChange={setIsDialogOpen} 
      />
    </>
  );
});

WineCard.displayName = 'WineCard';
