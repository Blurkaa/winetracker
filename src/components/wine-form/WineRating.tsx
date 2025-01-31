import { Star, StarHalf } from "lucide-react";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface WineRatingProps {
  rating: number;
  onRatingChange: (rating: number) => void;
}

export const WineRating = ({ rating, onRatingChange }: WineRatingProps) => {
  const [hoverRating, setHoverRating] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const halfWidth = rect.width / 2;
    
    const star = Number(button.getAttribute('data-star'));
    setHoverRating(x < halfWidth ? star - 0.5 : star);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const handleClick = (star: number, e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const halfWidth = rect.width / 2;
    
    onRatingChange(x < halfWidth ? star - 0.5 : star);
  };

  const renderStar = (position: number) => {
    const displayRating = hoverRating || rating;
    const isHalfStar = displayRating === position - 0.5;
    const isFullStar = displayRating >= position;
    
    return (
      <button
        key={position}
        type="button"
        data-star={position}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={(e) => handleClick(position, e)}
        className="focus:outline-none w-6 h-6 relative"
      >
        {isHalfStar ? (
          <StarHalf
            size={24}
            className="rating-star absolute inset-0"
          />
        ) : (
          <Star
            size={24}
            className={`rating-star absolute inset-0 ${
              isFullStar ? "fill-gold" : "fill-none text-gray-300"
            }`}
          />
        )}
      </button>
    );
  };

  return (
    <div className="space-y-2">
      <Label>Rating</Label>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => renderStar(star))}
      </div>
    </div>
  );
};