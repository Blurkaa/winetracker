
import * as React from "react";
import { getAllCountries } from "@/data/wineRegions";
import { BaseCombobox } from "./BaseCombobox";

interface CountryComboboxProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

export function CountryCombobox({ value, onChange, placeholder }: CountryComboboxProps) {
  const countries = React.useMemo(() => getAllCountries(), []);
  
  return (
    <BaseCombobox
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      searchPlaceholder="Search countries..."
      options={countries}
    />
  );
}
