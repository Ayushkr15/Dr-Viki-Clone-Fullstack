import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Heart } from "lucide-react";

export const LifestyleHistory = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Heart className="w-5 h-5 text-primary" />
        <div>
          <h2 className="text-xl font-semibold">Lifestyle & Social History</h2>
          <p className="text-sm text-muted-foreground">Please fill out all required fields to continue</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="smokingStatus">Smoking Status</Label>
          <Select>
            <SelectTrigger id="smokingStatus">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="never">Never</SelectItem>
              <SelectItem value="current">Current</SelectItem>
              <SelectItem value="former">Former</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="smokingQuantity">Quantity (if applicable)</Label>
          <Input id="smokingQuantity" placeholder="e.g., 5 cigarettes/day" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="smokingDuration">Duration (if applicable)</Label>
          <Input id="smokingDuration" placeholder="e.g., 10 years" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="alcoholConsumption">Alcohol Consumption</Label>
          <Input id="alcoholConsumption" placeholder="Specify frequency and details" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="substanceUse">Substance Use</Label>
          <Select>
            <SelectTrigger id="substanceUse">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="recreational">Recreational</SelectItem>
              <SelectItem value="prescription">Prescription</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="dietType">Diet Type</Label>
          <Select>
            <SelectTrigger id="dietType">
              <SelectValue placeholder="Select frequency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="vegetarian">Vegetarian</SelectItem>
              <SelectItem value="vegan">Vegan</SelectItem>
              <SelectItem value="non-vegetarian">Non-Vegetarian</SelectItem>
              <SelectItem value="pescatarian">Pescatarian</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="mealsPerDay">Meals per day</Label>
          <Select>
            <SelectTrigger id="mealsPerDay">
              <SelectValue placeholder="Select frequency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1-2">1-2 meals</SelectItem>
              <SelectItem value="3">3 meals</SelectItem>
              <SelectItem value="4-5">4-5 meals</SelectItem>
              <SelectItem value="6+">6+ meals</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="exerciseType">Physical Activity</Label>
          <Input id="exerciseType" placeholder="e.g., Walking, Yoga" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="exerciseFrequency">Exercise Frequency</Label>
          <Select>
            <SelectTrigger id="exerciseFrequency">
              <SelectValue placeholder="Select frequency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="3-5">3-5 times/week</SelectItem>
              <SelectItem value="1-2">1-2 times/week</SelectItem>
              <SelectItem value="rarely">Rarely</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="exerciseDuration">Exercise Duration</Label>
          <Input id="exerciseDuration" placeholder="e.g., 30 minutes" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="sleepHours">Sleep Duration</Label>
          <Input id="sleepHours" placeholder="Hours per night" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="sleepQuality">Sleep Quality</Label>
          <Select>
            <SelectTrigger id="sleepQuality">
              <SelectValue placeholder="Rate quality" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="excellent">Excellent</SelectItem>
              <SelectItem value="good">Good</SelectItem>
              <SelectItem value="fair">Fair</SelectItem>
              <SelectItem value="poor">Poor</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="sleepPatterns">Dream Patterns</Label>
          <Textarea id="sleepPatterns" placeholder="Describe your dream patterns, if any" rows={3} />
        </div>
      </div>
    </div>
  );
};
