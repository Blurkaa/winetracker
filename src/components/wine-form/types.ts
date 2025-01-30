export interface WineFormData {
  name: string;
  producer: string;
  region: string;
  country: string;
  appellation: string;
  vintage: number;
  price: number;
  type: "red" | "rosé" | "white" | "sparkling" | "sweet" | "fortified";
  alcoholLevel: number;
  grapeVariety: string;
  rating: number;
  imageUrl?: string;
  appearance: {
    clarity: "clear" | "hazy";
    intensity: "pale" | "medium" | "deep";
    colours: string[];
  };
  nose: {
    condition: "clean" | "unclean";
    intensity: "light" | "medium-" | "medium" | "medium+" | "pronounced";
    aromaCharacteristics: string;
    development: "youthful" | "developing" | "fully developed" | "tired";
  };
  palate: {
    sweetness: "dry" | "off-dry" | "medium-dry" | "medium-sweet" | "sweet" | "luscious";
    acidity: "low" | "medium-" | "medium" | "medium+" | "high";
    tannin: "low" | "medium-" | "medium" | "medium+" | "high";
    alcohol: "low" | "medium" | "high";
    body: "light" | "medium-" | "medium" | "medium+" | "full";
    mousse?: "delicate" | "creamy" | "aggressive";
    flavourIntensity: "light" | "medium-" | "medium" | "medium+" | "pronounced";
    finish: "short" | "medium-" | "medium" | "medium+" | "long";
  };
  notes?: string;
}