import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Activity } from "lucide-react";
import { useState } from "react";

export const CurrentHealthStatus = () => {
  const [stress, setStress] = useState([5]);
  const [depression, setDepression] = useState([5]);
  const [anxiety, setAnxiety] = useState([5]);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Activity className="w-5 h-5 text-primary" />
        <div>
          <h2 className="text-xl font-semibold">Current Health Status</h2>
          <p className="text-sm text-muted-foreground">Please fill out all required fields to continue</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="weight">Weight (lbs)</Label>
          <Input id="weight" type="number" placeholder="170" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="height">Height (inches)</Label>
          <Input id="height" type="number" placeholder="70" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="bmi">BMI</Label>
          <Input id="bmi" placeholder="Calculated automatically" disabled />
        </div>

        <div className="space-y-2">
          <Label htmlFor="bloodPressure">Blood Pressure</Label>
          <Input id="bloodPressure" placeholder="120/80 mmHg" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="heartRate">Heart Rate</Label>
          <Input id="heartRate" placeholder="72 bpm" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="temperature">Temperature</Label>
          <Input id="temperature" placeholder="98.6°F" />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="symptoms">Current Symptoms</Label>
          <Textarea 
            id="symptoms" 
            placeholder="Describe any current symptoms, their duration, frequency, and severity" 
            rows={3} 
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="pain">Pain or Discomfort</Label>
          <Textarea 
            id="pain" 
            placeholder="Describe any pain or discomfort, location, intensity (1-10 scale)" 
            rows={3} 
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="reproductiveHealth">Reproductive Health</Label>
          <Textarea 
            id="reproductiveHealth" 
            placeholder="For females: menstrual cycle details, irregularities, etc. For males: reproductive health concerns" 
            rows={3} 
          />
        </div>

        <div className="space-y-4 md:col-span-2">
          <div className="space-y-2">
            <Label>Stress Level: {stress[0]}/10</Label>
            <Slider
              value={stress}
              onValueChange={setStress}
              max={10}
              step={1}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label>Depression Level: {depression[0]}/10</Label>
            <Slider
              value={depression}
              onValueChange={setDepression}
              max={10}
              step={1}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label>Anxiety Level: {anxiety[0]}/10</Label>
            <Slider
              value={anxiety}
              onValueChange={setAnxiety}
              max={10}
              step={1}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
