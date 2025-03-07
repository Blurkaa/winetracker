
import * as React from "react";
import { getRegionsByCountry, getAllRegions } from "@/data/wineRegions";
import { BaseCombobox } from "./BaseCombobox";

interface RegionComboboxProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  country: string;
}

export function RegionCombobox({ value, onChange, placeholder, country }: RegionComboboxProps) {
  // Get regions based on selected country
  const regions = React.useMemo(() => {
    return country ? getRegionsByCountry(country) : getAllRegions();
  }, [country]);
  
  // Reset region value when country changes if the current region is not in the new country's list
  React.useEffect(() => {
    if (country && value && !getRegionsByCountry(country).includes(value)) {
      onChange("");
    }
  }, [country, value, onChange]);

  return (
    <BaseCombobox
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      searchPlaceholder="Search regions..."
      options={regions}
      disabled={country === ""}
    />
  );
}
