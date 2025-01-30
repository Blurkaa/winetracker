import { Star } from "lucide-react";
import { Label } from "@/components/ui/label";

interface WineRatingProps {
  rating: number;
  onRatingChange: (rating: number) => void;
}

export const WineRating = ({ rating, onRatingChange }: WineRatingProps) => {
  return (
    <div className="space-y-2">
      <Label>Rating</Label>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onRatingChange(star)}
            className="focus:outline-none"
          >
            <Star
              size={24}
              className={`rating-star ${
                star <= rating ? "fill-gold" : "fill-none text-gray-300"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
};