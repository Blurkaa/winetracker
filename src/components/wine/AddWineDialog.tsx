
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { AddWineForm } from "@/components/wine-form/AddWineForm";
import { supabase } from "@/integrations/supabase/client";
import type { WineFormData } from "@/components/wine-form/types";

interface AddWineDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AddWineDialog = ({ isOpen, onOpenChange }: AddWineDialogProps) => {
  const handleAddWine = async (wine: WineFormData) => {
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
      rating: wine.rating,
      appearance: wine.appearance,
      nose: wine.nose,
      palate: wine.palate,
      notes: wine.notes
    }]);

    if (error) {
      console.error("Error adding wine:", error);
      return;
    }

    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
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
  );
};
