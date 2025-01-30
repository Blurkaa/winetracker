import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { WineFormData } from "./types";

interface WineNoseProps {
  formData: WineFormData;
  onUpdate: (updates: Partial<WineFormData>) => void;
}

export const WineNose = ({ formData, onUpdate }: WineNoseProps) => {
  return (
    <div>
      <h4 className="font-medium mb-2">Nose</h4>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Condition</Label>
          <Select
            value={formData.nose.condition}
            onValueChange={(value: any) =>
              onUpdate({
                nose: { ...formData.nose, condition: value }
              })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="clean">Clean</SelectItem>
              <SelectItem value="unclean">Unclean</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Intensity</Label>
          <Select
            value={formData.nose.intensity}
            onValueChange={(value: any) =>
              onUpdate({
                nose: { ...formData.nose, intensity: value }
              })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="medium-">Medium-</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="medium+">Medium+</SelectItem>
              <SelectItem value="pronounced">Pronounced</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2 mt-4">
        <Label>Aroma Characteristics</Label>
        <Textarea
          value={formData.nose.aromaCharacteristics}
          onChange={(e) =>
            onUpdate({
              nose: { ...formData.nose, aromaCharacteristics: e.target.value }
            })
          }
          placeholder="Describe the aromas..."
        />
      </div>

      <div className="space-y-2 mt-4">
        <Label>Development</Label>
        <Select
          value={formData.nose.development}
          onValueChange={(value: any) =>
            onUpdate({
              nose: { ...formData.nose, development: value }
            })
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="youthful">Youthful</SelectItem>
            <SelectItem value="developing">Developing</SelectItem>
            <SelectItem value="fully developed">Fully Developed</SelectItem>
            <SelectItem value="tired">Tired</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};