import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AddWineForm } from "@/components/wine-form/AddWineForm";
import { WineCard } from "@/components/WineCard";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Label } from "@/components/ui/label";

const Index = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [filters, setFilters] = useState({
    country: "",
    region: "",
    grapeVariety: "",
    minRating: "",
    type: "",
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
        query = query.ilike("grape_variety", `%${filters.grapeVariety}%`);
      }
      if (filters.minRating) {
        query = query.gte("rating", parseInt(filters.minRating));
      }
      if (filters.type) {
        query = query.eq("type", filters.type);
      }

      const { data, error } = await query;
      
      if (error) {
        console.error("Error fetching wines:", error);
        return [];
      }

      // Transform the data to match the WineCard component's expected structure
      return data.map(wine => ({
        name: wine.name,
        producer: wine.producer,
        region: wine.region,
        country: wine.country,
        appellation: wine.appellation,
        vintage: wine.vintage,
        price: Number(wine.price),
        type: wine.type as "red" | "rosé" | "white" | "sparkling" | "sweet" | "fortified",
        alcoholLevel: Number(wine.alcohol_level),
        grapeVariety: wine.grape_variety,
        rating: wine.rating,
        imageUrl: wine.image_url,
        appearance: wine.appearance,
        nose: wine.nose,
        palate: wine.palate,
        notes: wine.notes
      }));
    }
  });

  const handleAddWine = async (wine: any) => {
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
      grape_variety: wine.grapeVariety,
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

        <div className="bg-white rounded-lg p-6 mb-8 shadow-sm">
          <h2 className="font-playfair text-xl font-semibold mb-4">Filter Wines</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <div className="space-y-2">
              <Label>Country</Label>
              <Input
                placeholder="Filter by country"
                value={filters.country}
                onChange={(e) => setFilters(prev => ({ ...prev, country: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label>Region</Label>
              <Input
                placeholder="Filter by region"
                value={filters.region}
                onChange={(e) => setFilters(prev => ({ ...prev, region: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label>Grape Variety</Label>
              <Input
                placeholder="Filter by grape"
                value={filters.grapeVariety}
                onChange={(e) => setFilters(prev => ({ ...prev, grapeVariety: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label>Minimum Rating</Label>
              <Select
                value={filters.minRating}
                onValueChange={(value) => setFilters(prev => ({ ...prev, minRating: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Any rating</SelectItem>
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <SelectItem key={rating} value={rating.toString()}>
                      {rating} star{rating !== 1 ? "s" : ""} or higher
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Wine Type</Label>
              <Select
                value={filters.type}
                onValueChange={(value) => setFilters(prev => ({ ...prev, type: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Any type</SelectItem>
                  <SelectItem value="red">Red</SelectItem>
                  <SelectItem value="white">White</SelectItem>
                  <SelectItem value="rosé">Rosé</SelectItem>
                  <SelectItem value="sparkling">Sparkling</SelectItem>
                  <SelectItem value="sweet">Sweet</SelectItem>
                  <SelectItem value="fortified">Fortified</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading your wine collection...</p>
          </div>
        ) : wines.length === 0 ? (
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