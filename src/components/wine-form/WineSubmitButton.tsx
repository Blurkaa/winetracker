
import { Button } from "@/components/ui/button";

interface WineSubmitButtonProps {
  label: string;
}

export const WineSubmitButton = ({ label }: WineSubmitButtonProps) => {
  return (
    <Button type="submit" className="w-full bg-wine hover:bg-wine-light">
      {label}
    </Button>
  );
};

