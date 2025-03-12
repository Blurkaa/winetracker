
import { FormEvent } from "react";
import { useToast } from "@/components/ui/use-toast";
import { WineFormData } from "./types";
import { validateWineForm } from "./utils/formValidation";

interface WineFormSubmitHandlerProps {
  formData: WineFormData;
  rating: number;
  onSubmit: (wine: WineFormData) => void;
  resetForm: () => void;
  initialData?: WineFormData;
  children: React.ReactNode;
}

export const WineFormSubmitHandler = ({
  formData,
  rating,
  onSubmit,
  resetForm,
  initialData,
  children
}: WineFormSubmitHandlerProps) => {
  const { toast } = useToast();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    const missingFields = validateWineForm(formData);

    if (missingFields.length > 0) {
      toast({
        title: "Missing Required Fields",
        description: `Please fill in the following fields: ${missingFields.join(", ")}`,
        variant: "destructive",
      });
      return;
    }

    onSubmit({ ...formData, rating });
    
    if (!initialData) {
      resetForm();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {children}
    </form>
  );
};
