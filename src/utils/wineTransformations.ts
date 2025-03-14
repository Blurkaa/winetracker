
import type { WineFormData } from "@/components/wine-form/types";
import type { Database } from "@/integrations/supabase/types";

type WineRow = Database['public']['Tables']['wines']['Row'];

export const transformWineData = (wine: WineRow): WineFormData => ({
  id: wine.id,
  name: wine.name,
  producer: wine.producer,
  region: wine.region,
  country: wine.country,
  appellation: wine.appellation || "",
  vintage: wine.vintage,
  price: Number(wine.price || 0),
  type: wine.type as WineFormData['type'],
  alcoholLevel: Number(wine.alcohol_level || 0),
  grapeVariety: wine.grape_variety || [],
  rating: (wine.rating || 0) / 2, // Convert from integer (1-10) to decimal (0.5-5)
  appearance: {
    clarity: ((wine.appearance as any)?.clarity || "clear") as "clear" | "hazy",
    intensity: ((wine.appearance as any)?.intensity || "medium") as "pale" | "medium" | "deep",
    colours: ((wine.appearance as any)?.colours || []) as string[]
  },
  nose: {
    condition: ((wine.nose as any)?.condition || "clean") as "clean" | "unclean",
    intensity: ((wine.nose as any)?.intensity || "medium") as "light" | "medium-" | "medium" | "medium+" | "pronounced",
    aromaCharacteristics: ((wine.nose as any)?.aromaCharacteristics || ""),
    development: ((wine.nose as any)?.development || "youthful") as "youthful" | "developing" | "fully developed" | "tired"
  },
  palate: {
    sweetness: ((wine.palate as any)?.sweetness || "dry") as WineFormData['palate']['sweetness'],
    acidity: ((wine.palate as any)?.acidity || "medium") as WineFormData['palate']['acidity'],
    tannin: ((wine.palate as any)?.tannin || "medium") as WineFormData['palate']['tannin'],
    alcohol: ((wine.palate as any)?.alcohol || "medium") as WineFormData['palate']['alcohol'],
    body: ((wine.palate as any)?.body || "medium") as WineFormData['palate']['body'],
    mousse: (wine.palate as any)?.mousse as WineFormData['palate']['mousse'],
    flavourIntensity: ((wine.palate as any)?.flavourIntensity || "medium") as WineFormData['palate']['flavourIntensity'],
    finish: ((wine.palate as any)?.finish || "medium") as WineFormData['palate']['finish']
  },
  blice: {
    // Since 'blice' might not exist in the database response, we need to handle it safely
    balance: (wine as any)?.blice?.balance || 0,
    length: (wine as any)?.blice?.length || 0,
    intensity: (wine as any)?.blice?.intensity || 0,
    complexity: (wine as any)?.blice?.complexity || 0,
    enjoyment: (wine as any)?.blice?.enjoyment || 0
  },
  notes: wine.notes || ""
});
