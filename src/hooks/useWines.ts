
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { transformWineData } from "@/utils/wineTransformations";
import type { WineFilterOptions } from "@/types/wine";

export const useWines = (filters: WineFilterOptions, searchQuery: string) => {
  return useQuery({
    queryKey: ["wines", filters, searchQuery],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        return [];
      }

      let query = supabase
        .from("wines")
        .select("*")
        .eq('user_id', user.id);

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
        
        // Apply rating sort if a min rating is selected
        if (filters.ratingSort) {
          query = query.order("rating", { ascending: filters.ratingSort === "asc" });
        }
      }
      if (filters.type !== "all") {
        query = query.eq("type", filters.type);
      }

      // Apply main sorting if rating sort isn't being used
      if (filters.minRating === "all" || !filters.ratingSort) {
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
      }

      const { data, error } = await query;
      
      if (error) {
        console.error("Error fetching wines:", error);
        return [];
      }

      return data.map(transformWineData);
    },
    staleTime: 60000, // Cache data for 1 minute
    refetchOnWindowFocus: false, // Don't refetch when window regains focus
  });
};
