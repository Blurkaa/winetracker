
import { grapeVarietiesA_G } from './grapeVarietiesA_G';
import { grapeVarietiesH_O } from './grapeVarietiesH_O';
import { grapeVarietiesP_Z } from './grapeVarietiesP_Z';

/**
 * Combines all grape varieties from separate files into a single array.
 */
export const grapeVarieties: string[] = [
  ...grapeVarietiesA_G,
  ...grapeVarietiesH_O,
  ...grapeVarietiesP_Z
];

/**
 * Get all grape varieties.
 * @returns Sorted array of all grape variety names
 */
export const getAllGrapeVarieties = (): string[] => {
  return [...grapeVarieties].sort();
};

/**
 * Get grape varieties starting with specific letters.
 * @param startLetter The starting letter or range (e.g., 'A' or 'A-C')
 * @returns Filtered and sorted array of grape varieties
 */
export const getGrapeVarietiesByLetter = (startLetter: string): string[] => {
  if (startLetter.includes('-')) {
    // Handle letter range like 'A-C'
    const [start, end] = startLetter.split('-');
    return grapeVarieties
      .filter(grape => {
        const firstChar = grape.charAt(0).toUpperCase();
        return firstChar >= start && firstChar <= end;
      })
      .sort();
  }
  
  // Handle single letter like 'A'
  return grapeVarieties
    .filter(grape => grape.charAt(0).toUpperCase() === startLetter.toUpperCase())
    .sort();
};

