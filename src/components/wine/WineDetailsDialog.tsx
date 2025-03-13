
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { WineFormData } from "@/components/wine-form/types";
import { Star, StarHalf, Pencil, X } from "lucide-react";
import { useState } from "react";
import { AddWineForm } from "@/components/wine-form/AddWineForm";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";

interface WineDetailsDialogProps {
  wine: WineFormData;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onWineUpdate?: (updatedWine: WineFormData) => void;
}

const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const WineDetailsDialog = ({ wine, isOpen, onOpenChange, onWineUpdate }: WineDetailsDialogProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentWine, setCurrentWine] = useState(wine);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const renderStar = (position: number) => {
    const isHalfStar = currentWine.rating === position - 0.5;
    const isFullStar = currentWine.rating >= position;
    
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

  const handleSubmit = async (updatedWine: WineFormData) => {
    try {
      const ratingAsInteger = Math.round(updatedWine.rating * 2);
      
      const { error } = await supabase
        .from('wines')
        .update({
          name: updatedWine.name,
          producer: updatedWine.producer,
          region: updatedWine.region,
          country: updatedWine.country,
          appellation: updatedWine.appellation,
          vintage: updatedWine.vintage,
          price: updatedWine.price,
          type: updatedWine.type,
          alcohol_level: updatedWine.alcoholLevel,
          grape_variety: updatedWine.grapeVariety,
          rating: ratingAsInteger,
          appearance: updatedWine.appearance,
          nose: updatedWine.nose,
          palate: updatedWine.palate,
          blice: updatedWine.blice,
          notes: updatedWine.notes
        })
        .eq('id', wine.id);

      if (error) throw error;

      const updatedWineWithRating = {
        ...updatedWine,
        rating: ratingAsInteger / 2
      };

      setCurrentWine(updatedWineWithRating);
      onWineUpdate?.(updatedWineWithRating);

      // Invalidate and refetch wines query
      await queryClient.invalidateQueries({ queryKey: ['wines'] });

      toast({
        title: "Wine Updated",
        description: "The wine details have been successfully updated.",
      });

      setIsEditing(false);
    } catch (error) {
      console.error('Error updating wine:', error);
      toast({
        title: "Error",
        description: "Failed to update wine details. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        {isEditing ? (
          <>
            <div className="flex justify-between items-center mb-4">
              <DialogTitle className="font-playfair text-2xl font-semibold text-wine">
                Edit Wine
              </DialogTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsEditing(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <AddWineForm onSubmit={handleSubmit} initialData={currentWine} />
          </>
        ) : (
          <>
            <DialogHeader>
              <div className="flex justify-between items-start">
                <div>
                  <DialogTitle className="font-playfair text-2xl font-semibold text-wine">
                    {currentWine.name}
                  </DialogTitle>
                  <p className="text-sm text-muted-foreground">{currentWine.producer}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((position) => renderStar(position))}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsEditing(true)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </DialogHeader>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-muted-foreground">Type:</span>
                  <span className="font-medium ml-2">{capitalizeFirstLetter(currentWine.type)}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Price:</span>
                  <span className="font-medium ml-2">€{currentWine.price}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Region:</span>
                  <span className="font-medium ml-2">{currentWine.region}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Country:</span>
                  <span className="font-medium ml-2">{currentWine.country}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Vintage:</span>
                  <span className="font-medium ml-2">{currentWine.vintage}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Alcohol:</span>
                  <span className="font-medium ml-2">{currentWine.alcoholLevel}%</span>
                </div>
              </div>

              <div>
                <span className="text-muted-foreground">Grape Varieties:</span>
                <span className="font-medium ml-2">{currentWine.grapeVariety.join(", ")}</span>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Appearance</h4>
                  <p>
                    {capitalizeFirstLetter(currentWine.appearance.clarity)}, {currentWine.appearance.intensity}, 
                    {currentWine.appearance.colours.join(", ")}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Nose</h4>
                  <p>
                    {capitalizeFirstLetter(currentWine.nose.condition)}, {currentWine.nose.intensity} intensity
                    {currentWine.nose.aromaCharacteristics && (
                      <span className="block italic mt-2">{currentWine.nose.aromaCharacteristics}</span>
                    )}
                    <span className="block mt-2">Development: {currentWine.nose.development}</span>
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Palate</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <p>Sweetness: {currentWine.palate.sweetness}</p>
                    <p>Acidity: {currentWine.palate.acidity}</p>
                    <p>Tannin: {currentWine.palate.tannin}</p>
                    <p>Body: {currentWine.palate.body}</p>
                    <p>Alcohol: {currentWine.palate.alcohol}</p>
                    {currentWine.type === "sparkling" && <p>Mousse: {currentWine.palate.mousse}</p>}
                    <p>Flavour Intensity: {currentWine.palate.flavourIntensity}</p>
                    <p>Finish: {currentWine.palate.finish}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">BLICE Rating</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <p>Balance: {currentWine.blice.balance.toFixed(1)}</p>
                    <p>Length: {currentWine.blice.length.toFixed(1)}</p>
                    <p>Intensity: {currentWine.blice.intensity.toFixed(1)}</p>
                    <p>Complexity: {currentWine.blice.complexity.toFixed(1)}</p>
                    <p>Enjoyment: {currentWine.blice.enjoyment.toFixed(1)}</p>
                    <p className="col-span-2">Total: {currentWine.rating.toFixed(1)}</p>
                  </div>
                </div>
              </div>

              {currentWine.notes && (
                <div>
                  <h4 className="font-semibold mb-2">Notes</h4>
                  <p className="italic">{currentWine.notes}</p>
                </div>
              )}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
