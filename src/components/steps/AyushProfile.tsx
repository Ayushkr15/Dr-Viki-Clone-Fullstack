import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles } from "lucide-react";

export const AyushProfile = ({ data, handleChange }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Sparkles className="w-5 h-5 text-primary" />
        <div>
          <h2 className="text-xl font-semibold">AYUSH Profile</h2>
          <p className="text-sm text-muted-foreground">
            Provide your constitutional assessment.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6">
        <div className="space-y-4">
          <Label>Dosha Balance</Label>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="vata" className="text-sm">
                Vata (0-100)
              </Label>
              <Input
                id="vata"
                type="number"
                min="0"
                max="100"
                placeholder="0-100"
                value={data.vata}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pitta" className="text-sm">
                Pitta (0-100)
              </Label>
              <Input
                id="pitta"
                type="number"
                min="0"
                max="100"
                placeholder="0-100"
                value={data.pitta}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="kapha" className="text-sm">
                Kapha (0-100)
              </Label>
              <Input
                id="kapha"
                type="number"
                min="0"
                max="100"
                placeholder="0-100"
                value={data.kapha}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="prakriti">Prakriti (Constitution Type)</Label>
          <Input
            id="prakriti"
            placeholder="e.g., Vata-Pitta"
            value={data.prakriti}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="vikriti">Vikriti (Current Imbalance)</Label>
          <Input
            id="vikriti"
            placeholder="e.g., Kapha imbalance"
            value={data.vikriti}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};
