import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { WineFormData } from "@/components/wine-form/types";
import { Star, StarHalf } from "lucide-react";

interface WineDetailsDialogProps {
  wine: WineFormData;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const WineDetailsDialog = ({ wine, isOpen, onOpenChange }: WineDetailsDialogProps) => {
  const renderStar = (position: number) => {
    const isHalfStar = wine.rating === position - 0.5;
    const isFullStar = wine.rating >= position;
    
    return (
      <div key={position} className="w-4 h-4">
        {isHalfStar ? (
          <StarHalf size={16} className="rating-star fill-gold" />
        ) : (
          <Star
            size={16}
            className={`rating-star ${isFullStar ? "fill-gold" : "fill-none text-gray-300"}`}
          />
        )}
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex justify-between items-start">
            <div>
              <DialogTitle className="font-playfair text-2xl font-semibold text-wine">
                {wine.name}
              </DialogTitle>
              <p className="text-sm text-muted-foreground">{wine.producer}</p>
            </div>
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((position) => renderStar(position))}
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {wine.imageUrl && (
            <div className="mb-4">
              <img
                src={wine.imageUrl}
                alt={wine.name}
                className="rounded-md object-cover w-full h-[400px]"
              />
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-muted-foreground">Type:</span>
              <span className="font-medium ml-2">{capitalizeFirstLetter(wine.type)}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Price:</span>
              <span className="font-medium ml-2">${wine.price}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Region:</span>
              <span className="font-medium ml-2">{wine.region}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Country:</span>
              <span className="font-medium ml-2">{wine.country}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Vintage:</span>
              <span className="font-medium ml-2">{wine.vintage}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Alcohol:</span>
              <span className="font-medium ml-2">{wine.alcoholLevel}%</span>
            </div>
          </div>

          <div>
            <span className="text-muted-foreground">Grape Varieties:</span>
            <span className="font-medium ml-2">{wine.grapeVariety.join(", ")}</span>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Appearance</h4>
              <p>
                {capitalizeFirstLetter(wine.appearance.clarity)}, {wine.appearance.intensity}, 
                {wine.appearance.colours.join(", ")}
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Nose</h4>
              <p>
                {capitalizeFirstLetter(wine.nose.condition)}, {wine.nose.intensity} intensity
                {wine.nose.aromaCharacteristics && (
                  <span className="block italic mt-2">{wine.nose.aromaCharacteristics}</span>
                )}
                <span className="block mt-2">Development: {wine.nose.development}</span>
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Palate</h4>
              <div className="grid grid-cols-2 gap-2">
                <p>Sweetness: {wine.palate.sweetness}</p>
                <p>Acidity: {wine.palate.acidity}</p>
                <p>Tannin: {wine.palate.tannin}</p>
                <p>Body: {wine.palate.body}</p>
                <p>Alcohol: {wine.palate.alcohol}</p>
                {wine.type === "sparkling" && <p>Mousse: {wine.palate.mousse}</p>}
                <p>Flavour Intensity: {wine.palate.flavourIntensity}</p>
                <p>Finish: {wine.palate.finish}</p>
              </div>
            </div>
          </div>

          {wine.notes && (
            <div>
              <h4 className="font-semibold mb-2">Notes</h4>
              <p className="italic">{wine.notes}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};