import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AddWineForm } from "@/components/wine-form/AddWineForm";
import { WineFormData } from "@/components/wine-form/types";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface EditWineDialogProps {
  wine: WineFormData & { id: string };
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onWineUpdated: () => void;
}

export const EditWineDialog = ({ wine, isOpen, onOpenChange, onWineUpdated }: EditWineDialogProps) => {
  const { toast } = useToast();

  const handleSubmit = async (updatedWine: WineFormData) => {
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
        rating: updatedWine.rating,
        image_url: updatedWine.imageUrl,
        appearance: updatedWine.appearance,
        nose: updatedWine.nose,
        palate: updatedWine.palate,
        notes: updatedWine.notes,
      })
      .eq('id', wine.id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update wine",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Wine updated successfully",
    });
    onWineUpdated();
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Wine</DialogTitle>
        </DialogHeader>
        <AddWineForm onSubmit={handleSubmit} initialData={wine} />
      </DialogContent>
    </Dialog>
  );
};