import { useState } from "react";
import { Star, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";

interface WineFormData {
  name: string;
  producer: string;
  region: string;
  country: string;
  appellation: string;
  vintage: number;
  price: number;
  type: "red" | "rosé" | "white" | "sparkling" | "sweet" | "fortified";
  alcoholLevel: number;
  grapeVariety: string;
  rating: number;
  imageUrl?: string;
  appearance: {
    clarity: "clear" | "hazy";
    intensity: "pale" | "medium" | "deep";
    colours: string[];
  };
  nose: {
    condition: "clean" | "unclean";
    intensity: "light" | "medium-" | "medium" | "medium+" | "pronounced";
    aromaCharacteristics: string;
    development: "youthful" | "developing" | "fully developed" | "tired";
  };
  palate: {
    sweetness: "dry" | "off-dry" | "medium-dry" | "medium-sweet" | "sweet" | "luscious";
    acidity: "low" | "medium-" | "medium" | "medium+" | "high";
    tannin: "low" | "medium-" | "medium" | "medium+" | "high";
    alcohol: "low" | "medium" | "high";
    body: "light" | "medium-" | "medium" | "medium+" | "full";
    mousse?: "delicate" | "creamy" | "aggressive";
    flavourIntensity: "light" | "medium-" | "medium" | "medium+" | "pronounced";
    finish: "short" | "medium-" | "medium" | "medium+" | "long";
  };
  notes?: string;
}

interface AddWineFormProps {
  onSubmit: (wine: WineFormData) => void;
}

export const AddWineForm = ({ onSubmit }: AddWineFormProps) => {
  const { toast } = useToast();
  const [rating, setRating] = useState(0);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  
  const [formData, setFormData] = useState<WineFormData>({
    name: "",
    producer: "",
    region: "",
    country: "",
    appellation: "",
    vintage: new Date().getFullYear(),
    price: 0,
    type: "red",
    alcoholLevel: 12,
    grapeVariety: "",
    rating: 0,
    appearance: {
      clarity: "clear",
      intensity: "medium",
      colours: [],
    },
    nose: {
      condition: "clean",
      intensity: "medium",
      aromaCharacteristics: "",
      development: "youthful",
    },
    palate: {
      sweetness: "dry",
      acidity: "medium",
      tannin: "medium",
      alcohol: "medium",
      body: "medium",
      flavourIntensity: "medium",
      finish: "medium",
    },
  });

  const wineColourOptions = {
    white: ["lemon-green", "lemon", "gold", "amber", "brown"],
    rosé: ["pink", "salmon", "orange"],
    red: ["purple", "ruby", "garnet", "tawny", "brown"]
  };

  const handleColourChange = (colour: string, isChecked: boolean) => {
    setFormData(prev => ({
      ...prev,
      appearance: {
        ...prev.appearance,
        colours: isChecked 
          ? [...prev.appearance.colours, colour]
          : prev.appearance.colours.filter(c => c !== colour)
      }
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.producer || !formData.region || !formData.grapeVariety) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    let imageUrl;
    if (selectedImage) {
      imageUrl = URL.createObjectURL(selectedImage);
    }

    onSubmit({ ...formData, rating, imageUrl });
    setFormData({
      name: "",
      producer: "",
      region: "",
      country: "",
      appellation: "",
      vintage: new Date().getFullYear(),
      price: 0,
      type: "red",
      alcoholLevel: 12,
      grapeVariety: "",
      rating: 0,
      appearance: {
        clarity: "clear",
        intensity: "medium",
        colours: [],
      },
      nose: {
        condition: "clean",
        intensity: "medium",
        aromaCharacteristics: "",
        development: "youthful",
      },
      palate: {
        sweetness: "dry",
        acidity: "medium",
        tannin: "medium",
        alcohol: "medium",
        body: "medium",
        flavourIntensity: "medium",
        finish: "medium",
      },
    });
    setRating(0);
    setSelectedImage(null);
    toast({
      title: "Wine Added",
      description: "Your wine has been added to the collection.",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Wine Name *</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="e.g. Château Margaux"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="producer">Producer *</Label>
        <Input
          id="producer"
          value={formData.producer}
          onChange={(e) => setFormData({ ...formData, producer: e.target.value })}
          placeholder="e.g. Château Margaux"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="country">Country *</Label>
          <Input
            id="country"
            value={formData.country}
            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
            placeholder="e.g. France"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="region">Region *</Label>
          <Input
            id="region"
            value={formData.region}
            onChange={(e) => setFormData({ ...formData, region: e.target.value })}
            placeholder="e.g. Bordeaux"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="appellation">Appellation</Label>
        <Input
          id="appellation"
          value={formData.appellation}
          onChange={(e) => setFormData({ ...formData, appellation: e.target.value })}
          placeholder="e.g. Margaux AOC"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="vintage">Vintage</Label>
          <Input
            id="vintage"
            type="number"
            value={formData.vintage}
            onChange={(e) => setFormData({ ...formData, vintage: Number(e.target.value) })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">Price</Label>
          <Input
            id="price"
            type="number"
            step="0.01"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Wine Type</Label>
        <Select
          value={formData.type}
          onValueChange={(value: any) => setFormData({ ...formData, type: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select wine type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="red">Red</SelectItem>
            <SelectItem value="rosé">Rosé</SelectItem>
            <SelectItem value="white">White</SelectItem>
            <SelectItem value="sparkling">Sparkling</SelectItem>
            <SelectItem value="sweet">Sweet</SelectItem>
            <SelectItem value="fortified">Fortified</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="alcoholLevel">Alcohol %</Label>
          <Input
            id="alcoholLevel"
            type="number"
            step="0.1"
            value={formData.alcoholLevel}
            onChange={(e) => setFormData({ ...formData, alcoholLevel: Number(e.target.value) })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="grapeVariety">Grape Variety *</Label>
          <Input
            id="grapeVariety"
            value={formData.grapeVariety}
            onChange={(e) => setFormData({ ...formData, grapeVariety: e.target.value })}
            placeholder="e.g. Cabernet Sauvignon"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Rating</Label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
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

      <div className="border-t pt-4 mt-4">
        <h3 className="font-semibold mb-4">WSET Evaluation</h3>
        
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Appearance</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Clarity</Label>
                <Select
                  value={formData.appearance.clarity}
                  onValueChange={(value: any) => 
                    setFormData({ 
                      ...formData, 
                      appearance: { ...formData.appearance, clarity: value }
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="clear">Clear</SelectItem>
                    <SelectItem value="hazy">Hazy</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Intensity</Label>
                <Select
                  value={formData.appearance.intensity}
                  onValueChange={(value: any) =>
                    setFormData({
                      ...formData,
                      appearance: { ...formData.appearance, intensity: value }
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pale">Pale</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="deep">Deep</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2 mt-4">
              <Label>Colours</Label>
              <div className="grid grid-cols-3 gap-2">
                {formData.type === "white" && (
                  <div className="space-y-2 border rounded-lg p-3">
                    <h5 className="font-medium mb-2">White Wine Colours</h5>
                    {wineColourOptions.white.map((colour) => (
                      <div key={colour} className="flex items-center space-x-2">
                        <Checkbox
                          id={colour}
                          checked={formData.appearance.colours.includes(colour)}
                          onCheckedChange={(checked) => handleColourChange(colour, checked as boolean)}
                        />
                        <Label htmlFor={colour} className="cursor-pointer">{colour}</Label>
                      </div>
                    ))}
                  </div>
                )}
                {formData.type === "rosé" && (
                  <div className="space-y-2 border rounded-lg p-3">
                    <h5 className="font-medium mb-2">Rosé Wine Colours</h5>
                    {wineColourOptions.rosé.map((colour) => (
                      <div key={colour} className="flex items-center space-x-2">
                        <Checkbox
                          id={colour}
                          checked={formData.appearance.colours.includes(colour)}
                          onCheckedChange={(checked) => handleColourChange(colour, checked as boolean)}
                        />
                        <Label htmlFor={colour} className="cursor-pointer">{colour}</Label>
                      </div>
                    ))}
                  </div>
                )}
                {formData.type === "red" && (
                  <div className="space-y-2 border rounded-lg p-3">
                    <h5 className="font-medium mb-2">Red Wine Colours</h5>
                    {wineColourOptions.red.map((colour) => (
                      <div key={colour} className="flex items-center space-x-2">
                        <Checkbox
                          id={colour}
                          checked={formData.appearance.colours.includes(colour)}
                          onCheckedChange={(checked) => handleColourChange(colour, checked as boolean)}
                        />
                        <Label htmlFor={colour} className="cursor-pointer">{colour}</Label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">Nose</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Condition</Label>
                <Select
                  value={formData.nose.condition}
                  onValueChange={(value: any) =>
                    setFormData({
                      ...formData,
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
                    setFormData({
                      ...formData,
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
                  setFormData({
                    ...formData,
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
                  setFormData({
                    ...formData,
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

          <div>
            <h4 className="font-medium mb-2">Palate</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Sweetness</Label>
                <Select
                  value={formData.palate.sweetness}
                  onValueChange={(value: any) =>
                    setFormData({
                      ...formData,
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
                    setFormData({
                      ...formData,
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
                    setFormData({
                      ...formData,
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
                    setFormData({
                      ...formData,
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
                    setFormData({
                      ...formData,
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
                      setFormData({
                        ...formData,
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
                    setFormData({
                      ...formData,
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
                    setFormData({
                      ...formData,
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
        </div>
      </div>

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
              onChange={handleImageChange}
            />
          </label>
        </div>
        {selectedImage && (
          <p className="text-sm text-muted-foreground">
            Selected: {selectedImage.name}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Additional Notes</Label>
        <Textarea
          id="notes"
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          placeholder="Add your additional notes..."
          className="h-24"
        />
      </div>

      <Button type="submit" className="w-full bg-wine hover:bg-wine-light">
        Add Wine
      </Button>
    </form>
