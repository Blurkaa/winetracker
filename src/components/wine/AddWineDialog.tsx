
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { AddWineForm } from "@/components/wine-form/AddWineForm";
import { supabase } from "@/integrations/supabase/client";
import type { WineFormData } from "@/components/wine-form/types";
import { useToast } from "@/components/ui/use-toast";

interface AddWineDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  children?: React.ReactNode;
}

export const AddWineDialog = ({ isOpen, onOpenChange, children }: AddWineDialogProps) => {
  const { toast } = useToast();

  const handleAddWine = async (wine: WineFormData) => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to add wines",
        variant: "destructive",
      });
      return;
    }

    // Convert rating from 0-5 scale (with halves) to 0-10 integer scale
    const ratingAsInteger = Math.round(wine.rating * 2);

    const { error } = await supabase.from("wines").insert([{
      name: wine.name,
      producer: wine.producer,
      region: wine.region,
      country: wine.country,
      appellation: wine.appellation,
      vintage: wine.vintage,
      price: wine.price,
      type: wine.type,
      alcohol_level: wine.alcoholLevel,
      grape_variety: Array.isArray(wine.grapeVariety) ? wine.grapeVariety : [wine.grapeVariety],
      rating: ratingAsInteger, // Store as integer (0-10)
      appearance: wine.appearance,
      nose: wine.nose,
      palate: wine.palate,
      notes: wine.notes,
      user_id: user.id
    }]);

    if (error) {
      console.error("Error adding wine:", error);
      toast({
        title: "Error",
        description: "Failed to add wine. Please try again.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Wine added to your collection",
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        {children || (
          <Button className="bg-wine hover:bg-wine-light">
            <Plus className="mr-2 h-4 w-4" />
            Add Wine
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-playfair text-2xl text-wine">Add New Wine</DialogTitle>
        </DialogHeader>
        <AddWineForm onSubmit={handleAddWine} />
      </DialogContent>
    </Dialog>
  );
};
