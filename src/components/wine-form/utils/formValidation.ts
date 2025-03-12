
interface ValidationField {
  value: any;
  label: string;
}

/**
 * Validates the wine form data and returns any missing required fields
 * @param formData The wine form data to validate
 * @returns Array of missing field labels
 */
export const validateWineForm = (formData: any) => {
  // Check required fields
  const requiredFields = {
    basic: {
      name: "Name",
      producer: "Producer",
      region: "Region",
      country: "Country",
    },
    grapeVariety: "Grape variety",
    appearance: {
      clarity: "Clarity",
      intensity: "Intensity"
    },
    nose: {
      condition: "Nose condition",
      intensity: "Nose intensity",
      development: "Development"
    },
    palate: {
      sweetness: "Sweetness",
      acidity: "Acidity",
      tannin: "Tannin",
      alcohol: "Alcohol",
      body: "Body",
      flavourIntensity: "Flavour intensity",
      finish: "Finish"
    }
  };

  // Check basic fields
  const missingBasicFields = Object.entries(requiredFields.basic)
    .filter(([key]) => !formData[key as keyof typeof formData])
    .map(([_, label]) => label);

  // Check grape variety
  if (formData.grapeVariety.length === 0) {
    missingBasicFields.push(requiredFields.grapeVariety);
  }

  // Check appearance fields
  const missingAppearanceFields = Object.entries(requiredFields.appearance)
    .filter(([key]) => !formData.appearance[key as keyof typeof formData.appearance])
    .map(([_, label]) => label);

  // Check nose fields
  const missingNoseFields = Object.entries(requiredFields.nose)
    .filter(([key]) => !formData.nose[key as keyof typeof formData.nose])
    .map(([_, label]) => label);

  // Check palate fields
  const missingPalateFields = Object.entries(requiredFields.palate)
    .filter(([key]) => !formData.palate[key as keyof typeof formData.palate])
    .map(([_, label]) => label);

  return [
    ...missingBasicFields,
    ...missingAppearanceFields,
    ...missingNoseFields,
    ...missingPalateFields
  ];
};
