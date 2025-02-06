import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { WineFilters } from "@/components/wine/WineFilters";
import { WineGrid } from "@/components/wine/WineGrid";
import { WineSearch } from "@/components/wine/WineSearch";
import { AddWineDialog } from "@/components/wine/AddWineDialog";
import { useWines } from "@/hooks/useWines";
import type { WineFilterOptions } from "@/types/wine";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { LogOut } from "lucide-react";

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
    sort: "recent"
  };
  const [filters, setFilters] = useState<WineFilterOptions>(initialFilters);

  const { data: wines = [], isLoading } = useWines(filters, searchQuery);

  const handleReset = () => {
    setFilters(initialFilters);
    setSearchQuery("");
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  return (
    <div className="min-h-screen bg-cream p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="font-playfair text-3xl font-bold text-wine">My Wine Collection</h1>
          <div className="flex gap-4">
            <AddWineDialog 
              isOpen={isDialogOpen}
              onOpenChange={setIsDialogOpen}
            />
            <Button
              variant="outline"
              onClick={handleLogout}
              className="flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
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