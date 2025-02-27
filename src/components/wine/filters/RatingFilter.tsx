
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowDown, ArrowUp } from "lucide-react";

interface RatingFilterProps {
  minRating: string;
  ratingSort?: "asc" | "desc";
  onRatingChange: (value: string) => void;
  onSortChange: (value: "asc" | "desc") => void;
}

export const RatingFilter = ({ minRating, ratingSort = "desc", onRatingChange, onSortChange }: RatingFilterProps) => (
  <div className="space-y-2">
    <Label>Minimum Rating</Label>
    <div className="flex space-x-2">
      <Select value={minRating} onValueChange={onRatingChange}>
        <SelectTrigger className="flex-1">
          <SelectValue placeholder="Select rating" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Any rating</SelectItem>
          {[1, 2, 3, 4, 5].map((rating) => (
            <SelectItem key={rating} value={rating.toString()}>
              {rating} star{rating !== 1 ? "s" : ""} or higher
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      {minRating !== "all" && (
        <Select value={ratingSort} onValueChange={onSortChange}>
          <SelectTrigger className="w-[130px]">
            <SelectValue placeholder="Sort order" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asc">
              <div className="flex items-center">
                <ArrowUp className="h-4 w-4 mr-2" />
                <span>Ascending</span>
              </div>
            </SelectItem>
            <SelectItem value="desc">
              <div className="flex items-center">
                <ArrowDown className="h-4 w-4 mr-2" />
                <span>Descending</span>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      )}
    </div>
  </div>
);
