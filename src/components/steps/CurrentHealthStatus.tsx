import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Activity } from "lucide-react";

export const CurrentHealthStatus = ({
  data,
  handleChange,
  handleSliderChange,
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Activity className="w-5 h-5 text-primary" />
        <div>
          <h2 className="text-xl font-semibold">Current Health Status</h2>
          <p className="text-sm text-muted-foreground">
            Please provide your current vitals.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="weight">Weight (kg)</Label>
          <Input
            id="weight"
            type="number"
            placeholder="70"
            value={data.weight}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="height">Height (cm)</Label>
          <Input
            id="height"
            type="number"
            placeholder="175"
            value={data.height}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="bloodPressure">Blood Pressure</Label>
          <Input
            id="bloodPressure"
            placeholder="e.g., 120/80 mmHg"
            value={data.bloodPressure}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="symptoms">Current Symptoms</Label>
          <Textarea
            id="symptoms"
            placeholder="Describe any current symptoms, their duration, and severity"
            rows={3}
            value={data.symptoms}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-4 md:col-span-2">
          <div className="space-y-2">
            <Label>Stress Level: {data.stressLevel}/10</Label>
            <Slider
              value={[data.stressLevel]}
              onValueChange={value => handleSliderChange("stressLevel", value)}
              max={10}
              step={1}
            />
          </div>
          <div className="space-y-2">
            <Label>Depression Level: {data.depressionLevel}/10</Label>
            <Slider
              value={[data.depressionLevel]}
              onValueChange={value =>
                handleSliderChange("depressionLevel", value)
              }
              max={10}
              step={1}
            />
          </div>
          <div className="space-y-2">
            <Label>Anxiety Level: {data.anxietyLevel}/10</Label>
            <Slider
              value={[data.anxietyLevel]}
              onValueChange={value => handleSliderChange("anxietyLevel", value)}
              max={10}
              step={1}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
