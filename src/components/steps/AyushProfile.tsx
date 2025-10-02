import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles } from "lucide-react";

export const AyushProfile = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Sparkles className="w-5 h-5 text-primary" />
        <div>
          <h2 className="text-xl font-semibold">AYUSH Profile</h2>
          <p className="text-sm text-muted-foreground">Please fill out all required fields to continue</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="space-y-4">
          <Label>Dosha Balance</Label>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="vata" className="text-sm">Vata (0-100)</Label>
              <Input id="vata" type="number" min="0" max="100" placeholder="0-100" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pitta" className="text-sm">Pitta (0-100)</Label>
              <Input id="pitta" type="number" min="0" max="100" placeholder="0-100" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="kapha" className="text-sm">Kapha (0-100)</Label>
              <Input id="kapha" type="number" min="0" max="100" placeholder="0-100" />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="pulseExamination">Pulse Examination</Label>
          <Textarea 
            id="pulseExamination" 
            placeholder="Record pulse examination findings" 
            rows={3} 
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="tongueExamination">Tongue Examination</Label>
          <Textarea 
            id="tongueExamination" 
            placeholder="Color, coating, texture, etc." 
            rows={3} 
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="urineExamination">Urine Examination</Label>
          <Textarea 
            id="urineExamination" 
            placeholder="Color, clarity, any abnormalities" 
            rows={3} 
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="skinExamination">Skin Examination</Label>
          <Textarea 
            id="skinExamination" 
            placeholder="Texture, color, moisture, etc." 
            rows={3} 
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="prakriti">Prakriti (Constitution Type)</Label>
          <Input id="prakriti" placeholder="Constitutional assessment" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="vikriti">Vikriti (Current Imbalance)</Label>
          <Input id="vikriti" placeholder="Current state assessment" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="agni">Agni (Digestive Fire)</Label>
          <Input id="agni" placeholder="Digestive capacity assessment" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="ayushTherapies">Current AYUSH Therapies</Label>
          <Textarea 
            id="ayushTherapies" 
            placeholder="Please specify details about current therapies and their effectiveness" 
            rows={4} 
          />
        </div>
      </div>
    </div>
  );
};
