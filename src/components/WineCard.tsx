import { Star, StarHalf, MoreVertical, Edit, Trash } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface WineCardProps {
  wine: {
    id: string;
    name: string;
    producer: string;
    region: string;
    country: string;
    appellation: string;
    vintage: number;
    price: number;
    type: "red" | "rosé" | "white" | "sparkling" | "sweet" | "fortified";
    alcoholLevel: number;
    grapeVariety: string[];
    rating: number;
    imageUrl?: string;
    appearance: {
      clarity: "clear" | "hazy";
      intensity: "pale" | "medium" | "deep";
      colours: string[];
    };
    nose: {
      condition: "clean" | "unclean";
      intensity: "light" | "medium-" | "medium" | "medium+" | "pronounced";
      aromaCharacteristics: string;
      development: "youthful" | "developing" | "fully developed" | "tired";
    };
    palate: {
      sweetness: "dry" | "off-dry" | "medium-dry" | "medium-sweet" | "sweet" | "luscious";
      acidity: "low" | "medium-" | "medium" | "medium+" | "high";
      tannin: "low" | "medium-" | "medium" | "medium+" | "high";
      alcohol: "low" | "medium" | "high";
      body: "light" | "medium-" | "medium" | "medium+" | "full";
      mousse?: "delicate" | "creamy" | "aggressive";
      flavourIntensity: "light" | "medium-" | "medium" | "medium+" | "pronounced";
      finish: "short" | "medium-" | "medium" | "medium+" | "long";
    };
    notes?: string;
  };
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export const WineCard = ({ wine, onEdit, onDelete }: WineCardProps) => {
  const { toast } = useToast();

  const handleDelete = async () => {
    if (!wine?.id) {
      toast({
        title: "Error",
        description: "Wine ID is missing",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('wines')
        .delete()
        .eq('id', wine.id);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to delete wine",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success",
        description: "Wine deleted successfully",
      });

      if (onDelete) {
        onDelete(wine.id);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

  const handleEdit = () => {
    if (!wine?.id) {
      toast({
        title: "Error",
        description: "Wine ID is missing",
        variant: "destructive",
      });
      return;
    }

    if (onEdit) {
      onEdit(wine.id);
    }
  };

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
    <Card className="wine-card">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-playfair text-xl font-semibold text-wine">{wine.name}</h3>
            <p className="text-sm text-muted-foreground">{wine.producer}</p>
          </div>
          <div className="flex items-start gap-2">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((position) => renderStar(position))}
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleEdit}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleDelete} className="text-red-600">
                  <Trash className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {wine.imageUrl && (
          <div className="mb-4">
            <img
              src={wine.imageUrl}
              alt={wine.name}
              className="rounded-md object-cover w-full h-[400px]"
            />
          </div>
        )}
        <div className="space-y-2 text-sm">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-muted-foreground">Type:</span>
              <span className="font-medium ml-2">{wine.type}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Price:</span>
              <span className="font-medium ml-2">€{wine.price}</span>
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

          <div className="mt-4">
            <h4 className="font-semibold mb-2">WSET Evaluation</h4>
            
            <div className="space-y-4">
              <div>
                <h5 className="font-medium">Appearance</h5>
                <p>
                  {wine.appearance.clarity}, {wine.appearance.intensity}, 
                  {wine.appearance.colours.join(", ")}
                </p>
              </div>

              <div>
                <h5 className="font-medium">Nose</h5>
                <p>
                  {wine.nose.condition}, {wine.nose.intensity} intensity
                  {wine.nose.aromaCharacteristics && (
                    <span className="block italic">{wine.nose.aromaCharacteristics}</span>
                  )}
                  Development: {wine.nose.development}
                </p>
              </div>

              <div>
                <h5 className="font-medium">Palate</h5>
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
          </div>

          {wine.notes && (
            <p className="text-muted-foreground mt-4 italic">{wine.notes}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};