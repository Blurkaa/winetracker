import { Upload } from "lucide-react";
import { Label } from "@/components/ui/label";

interface WineImageProps {
  selectedImage: File | null;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  existingImageUrl?: string;
}

export const WineImage = ({ selectedImage, onImageChange, existingImageUrl }: WineImageProps) => {
  return (
    <div className="space-y-2">
      <Label>Wine Image</Label>
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="wine-image"
          className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50"
        >
          {existingImageUrl ? (
            <div className="relative w-full h-full">
              <img
                src={existingImageUrl}
                alt="Current wine"
                className="object-cover w-full h-full rounded-lg"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity">
                <p className="text-white text-sm">Click to change image</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-8 h-8 mb-2 text-gray-500" />
              <p className="text-sm text-gray-500">Click to upload wine image</p>
            </div>
          )}
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