
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CountryCombobox } from "./CountryCombobox";
import { RegionCombobox } from "./RegionCombobox";

interface TextFilterProps {
  label: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  type?: "text" | "country" | "region";
  countryValue?: string;
}

export const TextFilter = ({ 
  label, 
  value, 
  placeholder, 
  onChange, 
  type = "text",
  countryValue = ""
}: TextFilterProps) => (
  <div className="space-y-2">
    <Label>{label}</Label>
    {type === "country" ? (
      <CountryCombobox
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    ) : type === "region" ? (
      <RegionCombobox
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        country={countryValue}
      />
    ) : (
      <Input
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    )}
  </div>
);
