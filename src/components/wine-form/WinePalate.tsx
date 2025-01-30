import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { WineFormData } from "./types";

interface WinePalateProps {
  formData: WineFormData;
  onUpdate: (updates: Partial<WineFormData>) => void;
}

export const WinePalate = ({ formData, onUpdate }: WinePalateProps) => {
  return (
    <div>
      <h4 className="font-medium mb-2">Palate</h4>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Sweetness</Label>
          <Select
            value={formData.palate.sweetness}
            onValueChange={(value: any) =>
              onUpdate({
                palate: { ...formData.palate, sweetness: value }
              })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dry">Dry</SelectItem>
              <SelectItem value="off-dry">Off-dry</SelectItem>
              <SelectItem value="medium-dry">Medium-dry</SelectItem>
              <SelectItem value="medium-sweet">Medium-sweet</SelectItem>
              <SelectItem value="sweet">Sweet</SelectItem>
              <SelectItem value="luscious">Luscious</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Acidity</Label>
          <Select
            value={formData.palate.acidity}
            onValueChange={(value: any) =>
              onUpdate({
                palate: { ...formData.palate, acidity: value }
              })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium-">Medium-</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="medium+">Medium+</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Tannin</Label>
          <Select
            value={formData.palate.tannin}
            onValueChange={(value: any) =>
              onUpdate({
                palate: { ...formData.palate, tannin: value }
              })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium-">Medium-</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="medium+">Medium+</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Body</Label>
          <Select
            value={formData.palate.body}
            onValueChange={(value: any) =>
              onUpdate({
                palate: { ...formData.palate, body: value }
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
              <SelectItem value="full">Full</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Alcohol Level</Label>
          <Select
            value={formData.palate.alcohol}
            onValueChange={(value: any) =>
              onUpdate({
                palate: { ...formData.palate, alcohol: value }
              })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low (&lt;11%)</SelectItem>
              <SelectItem value="medium">Medium (11-13.9%)</SelectItem>
              <SelectItem value="high">High (&gt;14%)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {formData.type === "sparkling" && (
          <div className="space-y-2">
            <Label>Mousse</Label>
            <Select
              value={formData.palate.mousse}
              onValueChange={(value: any) =>
                onUpdate({
                  palate: { ...formData.palate, mousse: value }
                })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="delicate">Delicate</SelectItem>
                <SelectItem value="creamy">Creamy</SelectItem>
                <SelectItem value="aggressive">Aggressive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="space-y-2">
          <Label>Flavour Intensity</Label>
          <Select
            value={formData.palate.flavourIntensity}
            onValueChange={(value: any) =>
              onUpdate({
                palate: { ...formData.palate, flavourIntensity: value }
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

        <div className="space-y-2">
          <Label>Finish</Label>
          <Select
            value={formData.palate.finish}
            onValueChange={(value: any) =>
              onUpdate({
                palate: { ...formData.palate, finish: value }
              })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="short">Short</SelectItem>
              <SelectItem value="medium-">Medium-</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="medium+">Medium+</SelectItem>
              <SelectItem value="long">Long</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};