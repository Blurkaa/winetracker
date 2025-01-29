import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AddWineForm } from "@/components/AddWineForm";
import { WineCard } from "@/components/WineCard";

interface Wine {
  name: string;
  producer: string;
  region: string;
  country: string;
  appellation: string;
  vintage: number;
  price: number;
  type: "red" | "rosé" | "white" | "sparkling" | "sweet" | "fortified";
  alcoholLevel: number;
  grapeVariety: string;
  rating: number;
  imageUrl?: string;
  appearance: {
    clarity: "clear" | "hazy";
    intensity: "pale" | "medium" | "deep";
    color: string;
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
}

const Index = () => {
  const [wines, setWines] = useState<Wine[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddWine = (wine: Wine) => {
    setWines([wine, ...wines]);
    setIsDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-cream p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="font-playfair text-3xl font-bold text-wine">My Wine Collection</h1>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-wine hover:bg-wine-light">
                <Plus className="mr-2 h-4 w-4" />
                Add Wine
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="font-playfair text-2xl text-wine">Add New Wine</DialogTitle>
              </DialogHeader>
              <AddWineForm onSubmit={handleAddWine} />
            </DialogContent>
          </Dialog>
        </div>

        {wines.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              Your collection is empty. Start by adding your first wine!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wines.map((wine, index) => (
              <WineCard key={index} wine={wine} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;