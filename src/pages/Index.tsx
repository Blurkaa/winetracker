
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { WineFilters } from "@/components/wine/WineFilters";
import { WineGrid } from "@/components/wine/WineGrid";
import { WineSearch } from "@/components/wine/WineSearch";
import { AddWineDialog } from "@/components/wine/AddWineDialog";
import { useWines } from "@/hooks/useWines";
import type { WineFilterOptions } from "@/types/wine";
import { Button } from "@/components/ui/button";
import { UserCircle, Plus } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const initialFilters: WineFilterOptions = {
    country: "",
    region: "",
    grapeVariety: "",
    minRating: "all",
    type: "all",
    sort: "recent",
    ratingSort: "desc"
  };
  const [filters, setFilters] = useState<WineFilterOptions>(initialFilters);

  const { data: wines = [], isLoading } = useWines(filters, searchQuery);

  const handleReset = useCallback(() => {
    setFilters(initialFilters);
    setSearchQuery("");
  }, []);
  
  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value);
  }, []);

  const handleFiltersChange = useCallback((newFilters: WineFilterOptions) => {
    setFilters(newFilters);
  }, []);

  return (
    <div className="min-h-screen bg-cream p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="font-playfair text-3xl font-bold text-wine">My Wine Collection</h1>
          <div className="flex gap-4">
            <div className="hidden md:block">
              <AddWineDialog 
                isOpen={isDialogOpen}
                onOpenChange={setIsDialogOpen}
              />
            </div>
            <Button
              variant="outline"
              onClick={() => navigate("/account")}
              className="flex items-center gap-2"
            >
              <UserCircle className="w-4 h-4" />
              Account
            </Button>
          </div>
        </div>

        <WineSearch searchQuery={searchQuery} setSearchQuery={handleSearchChange} />
        <WineFilters 
          filters={filters} 
          setFilters={handleFiltersChange} 
          onReset={handleReset}
        />
        <WineGrid wines={wines} isLoading={isLoading} />

        {/* Floating Add Wine button for mobile */}
        <div className="md:hidden fixed bottom-6 right-6">
          <AddWineDialog 
            isOpen={isDialogOpen}
            onOpenChange={setIsDialogOpen}
          >
            <Button 
              className="bg-wine hover:bg-wine-light rounded-full w-14 h-14 shadow-lg"
              size="icon"
            >
              <Plus className="h-6 w-6" />
            </Button>
          </AddWineDialog>
        </div>
      </div>
    </div>
  );
};

export default Index;
