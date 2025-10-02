import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Heart } from "lucide-react";

export const LifestyleHistory = ({
  data,
  handleChange,
  handleSelectChange,
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Heart className="w-5 h-5 text-primary" />
        <div>
          <h2 className="text-xl font-semibold">Lifestyle & Social History</h2>
          <p className="text-sm text-muted-foreground">
            Provide details about your lifestyle.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="smokingStatus">Smoking Status</Label>
          <Select
            onValueChange={value => handleSelectChange("smokingStatus", value)}
            value={data.smokingStatus}
          >
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
          <Label htmlFor="alcoholConsumption">Alcohol Consumption</Label>
          <Input
            id="alcoholConsumption"
            placeholder="e.g., Occasionally, 2-3 times a week"
            value={data.alcoholConsumption}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="dietType">Diet Type</Label>
          <Select
            onValueChange={value => handleSelectChange("dietType", value)}
            value={data.dietType}
          >
            <SelectTrigger id="dietType">
              <SelectValue placeholder="Select diet" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="vegetarian">Vegetarian</SelectItem>
              <SelectItem value="vegan">Vegan</SelectItem>
              <SelectItem value="non-vegetarian">Non-Vegetarian</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="mealsPerDay">Meals per day</Label>
          <Select
            onValueChange={value => handleSelectChange("mealsPerDay", value)}
            value={data.mealsPerDay}
          >
            <SelectTrigger id="mealsPerDay">
              <SelectValue placeholder="Select frequency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1-2">1-2 meals</SelectItem>
              <SelectItem value="3">3 meals</SelectItem>
              <SelectItem value="4+">4+ meals</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="exerciseFrequency">Exercise Frequency</Label>
          <Select
            onValueChange={value =>
              handleSelectChange("exerciseFrequency", value)
            }
            value={data.exerciseFrequency}
          >
            <SelectTrigger id="exerciseFrequency">
              <SelectValue placeholder="Select frequency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="3-5-week">3-5 times/week</SelectItem>
              <SelectItem value="1-2-week">1-2 times/week</SelectItem>
              <SelectItem value="rarely">Rarely</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="sleepQuality">Sleep Quality</Label>
          <Select
            onValueChange={value => handleSelectChange("sleepQuality", value)}
            value={data.sleepQuality}
          >
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
      </div>
    </div>
  );
};
