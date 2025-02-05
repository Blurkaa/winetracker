import { useState } from "react";
import { WineFormData } from "@/components/wine-form/types";
import { WineCard } from "@/components/WineCard";
import { EditWineDialog } from "./EditWineDialog";

interface WineGridProps {
  wines: (WineFormData & { id: string })[];
  isLoading: boolean;
  onWineUpdated: () => void;
}

export const WineGrid = ({ wines, isLoading, onWineUpdated }: WineGridProps) => {
  const [selectedWine, setSelectedWine] = useState<(WineFormData & { id: string }) | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleEdit = (id: string) => {
    const wine = wines.find(w => w.id === id);
    if (wine) {
      setSelectedWine(wine);
      setIsEditDialogOpen(true);
    }
  };

  const handleDelete = async (id: string) => {
    onWineUpdated();
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-64 bg-gray-100 rounded-lg animate-pulse"
          ></div>
        ))}
      </div>
    );
  }

  if (!wines.length) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No wines found</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wines.map((wine) => (
          <WineCard 
            key={wine.id} 
            wine={wine} 
            onEdit={() => handleEdit(wine.id)}
            onDelete={() => handleDelete(wine.id)}
          />
        ))}
      </div>

      {selectedWine && (
        <EditWineDialog
          wine={selectedWine}
          isOpen={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          onWineUpdated={onWineUpdated}
        />
      )}
    </>
  );
};