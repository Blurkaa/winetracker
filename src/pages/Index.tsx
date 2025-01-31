import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AddWineForm } from "@/components/wine-form/AddWineForm";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { WineFilters } from "@/components/wine/WineFilters";
import { WineGrid } from "@/components/wine/WineGrid";
import { transformWineData } from "@/utils/wineTransformations";
import type { WineFormData } from "@/components/wine-form/types";

const Index = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [filters, setFilters] = useState({
    country: "",
    region: "",
    grapeVariety: "",
    minRating: "all",
    type: "all",
  });

  const { data: wines = [], isLoading } = useQuery({
    queryKey: ["wines", filters],
    queryFn: async () => {
      let query = supabase
        .from("wines")
        .select("*")
        .order("created_at", { ascending: false });

      if (filters.country) {
        query = query.ilike("country", `%${filters.country}%`);
      }
      if (filters.region) {
        query = query.ilike("region", `%${filters.region}%`);
      }
      if (filters.grapeVariety) {
        query = query.contains("grape_variety", [filters.grapeVariety]);
      }
      if (filters.minRating !== "all") {
        query = query.gte("rating", parseInt(filters.minRating));
      }
      if (filters.type !== "all") {
        query = query.eq("type", filters.type);
      }

      const { data, error } = await query;
      
      if (error) {
        console.error("Error fetching wines:", error);
        return [];
      }

      return data.map(transformWineData);
    }
  });

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
      image_url: wine.imageUrl,
      appearance: wine.appearance,
      nose: wine.nose,
      palate: wine.palate,
      notes: wine.notes
    }]);

    if (error) {
      console.error("Error adding wine:", error);
      return;
    }

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

        <WineFilters filters={filters} setFilters={setFilters} />
        <WineGrid wines={wines} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default Index;