
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { WineFormData } from "./types";

interface WineNotesProps {
  notes: string;
  onUpdate: (updates: Partial<WineFormData>) => void;
}

export const WineNotes = ({ notes, onUpdate }: WineNotesProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="notes">Additional Notes</Label>
      <Textarea
        id="notes"
        value={notes}
        onChange={(e) => onUpdate({ notes: e.target.value })}
        placeholder="Add your additional notes..."
        className="h-24"
      />
    </div>
  );
};

