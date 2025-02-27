
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface TextFilterProps {
  label: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
}

export const TextFilter = ({ label, value, placeholder, onChange }: TextFilterProps) => (
  <div className="space-y-2">
    <Label>{label}</Label>
    <Input
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);
