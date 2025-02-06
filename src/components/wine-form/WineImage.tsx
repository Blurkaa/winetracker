import { Upload } from "lucide-react";
import { Label } from "@/components/ui/label";

interface WineImageProps {
  selectedImage: File | null;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const WineImage = ({ selectedImage, onImageChange }: WineImageProps) => {
  return (
    <div className="space-y-2">
      <Label>Wine Image</Label>
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="wine-image"
          className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Upload className="w-8 h-8 mb-2 text-gray-500" />
            <p className="text-sm text-gray-500">Click to upload wine image</p>
          </div>
          <input
            id="wine-image"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onImageChange}
          />
        </label>
      </div>
      {selectedImage && (
        <p className="text-sm text-muted-foreground">
          Selected: {selectedImage.name}
        </p>
      )}
    </div>
  );
};