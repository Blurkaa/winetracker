import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { transformWineData } from "@/utils/wineTransformations";
import type { WineFilterOptions } from "@/types/wine";
import { useToast } from "@/hooks/use-toast";

export const useWines = (filters: WineFilterOptions, searchQuery: string) => {
  const { toast } = useToast();

  return useQuery({
    queryKey: ["wines", filters, searchQuery],
    queryFn: async () => {
      try {
        let query = supabase
          .from("wines")
          .select("*");

        // Apply search filter
        if (searchQuery) {
          query = query.or(`name.ilike.%${searchQuery}%,producer.ilike.%${searchQuery}%`);
        }

        // Apply other filters
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

        // Apply sorting
        switch (filters.sort) {
          case "vintage_asc":
            query = query.order("vintage", { ascending: true });
            break;
          case "vintage_desc":
            query = query.order("vintage", { ascending: false });
            break;
          case "price_asc":
            query = query.order("price", { ascending: true });
            break;
          case "price_desc":
            query = query.order("price", { ascending: false });
            break;
          case "recent":
          default:
            query = query.order("created_at", { ascending: false });
        }

        const { data, error } = await query;
        
        if (error) {
          toast({
            title: "Error",
            description: "Failed to fetch wines",
            variant: "destructive",
          });
          return [];
        }

        return data.map(transformWineData);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch wines",
          variant: "destructive",
        });
        return [];
      }
    }
  });
};