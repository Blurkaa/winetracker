import { useState } from "react";
import { WineFilters } from "@/components/wine/WineFilters";
import { WineGrid } from "@/components/wine/WineGrid";
import { WineSearch } from "@/components/wine/WineSearch";
import { AddWineDialog } from "@/components/wine/AddWineDialog";
import { useWines } from "@/hooks/useWines";
import type { WineFilters } from "@/types/wine";

const Index = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const initialFilters: WineFilters = {
    country: "",
    region: "",
    grapeVariety: "",
    minRating: "all",
    type: "all",
    sort: "recent"
  };
  const [filters, setFilters] = useState<WineFilters>(initialFilters);

  const { data: wines = [], isLoading } = useWines(filters, searchQuery);

  const handleReset = () => {
    setFilters(initialFilters);
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-cream p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="font-playfair text-3xl font-bold text-wine">My Wine Collection</h1>
          <AddWineDialog 
            isOpen={isDialogOpen}
            onOpenChange={setIsDialogOpen}
          />
        </div>

        <WineSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <WineFilters 
          filters={filters} 
          setFilters={setFilters} 
          onReset={handleReset}
        />
        <WineGrid wines={wines} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default Index;