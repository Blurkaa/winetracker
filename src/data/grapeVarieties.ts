
/**
 * A comprehensive list of grape varieties.
 * This is a starting list that can be expanded.
 */
export const grapeVarieties: string[] = [
  // Red grape varieties
  "Cabernet Sauvignon",
  "Merlot",
  "Pinot Noir",
  "Syrah",
  "Shiraz",
  "Malbec",
  "Zinfandel",
  "Sangiovese",
  "Nebbiolo",
  "Grenache",
  "Tempranillo",
  "Barbera",
  "Carmenère",
  "Gamay",
  "Cabernet Franc",
  "Petit Verdot",
  
  // White grape varieties
  "Chardonnay",
  "Sauvignon Blanc",
  "Riesling",
  "Pinot Grigio",
  "Pinot Gris",
  "Gewürztraminer",
  "Viognier",
  "Chenin Blanc",
  "Semillon",
  "Albariño",
  "Verdejo",
  "Grüner Veltliner",
  "Muscat",
  "Vermentino",
  "Roussanne",
  "Marsanne",
  
  // Add more varieties as needed
];

/**
 * Get all grape varieties.
 * @returns Array of grape variety names
 */
export const getAllGrapeVarieties = (): string[] => {
  return [...grapeVarieties].sort();
};
