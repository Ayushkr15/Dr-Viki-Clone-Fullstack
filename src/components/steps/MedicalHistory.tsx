import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { FileText } from "lucide-react";

const commonConditions = [
  "Diabetes",
  "Hypertension",
  "Heart Disease",
  "Asthma",
  "Arthritis",
  "Cancer",
  "Thyroid Disorders",
  "Mental Health Conditions",
];

export const MedicalHistory = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <FileText className="w-5 h-5 text-primary" />
        <div>
          <h2 className="text-xl font-semibold">Medical History</h2>
          <p className="text-sm text-muted-foreground">Please fill out all required fields to continue</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <Label>Chronic Conditions</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {commonConditions.map((condition) => (
              <div key={condition} className="flex items-center space-x-2">
                <Checkbox id={condition.toLowerCase().replace(/\s+/g, '-')} />
                <label
                  htmlFor={condition.toLowerCase().replace(/\s+/g, '-')}
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {condition}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="otherConditions">Other Conditions</Label>
          <Textarea 
            id="otherConditions" 
            placeholder="Please specify other conditions and details" 
            rows={3} 
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="medications">Current Medications</Label>
          <Textarea 
            id="medications" 
            placeholder="List all current medications with dosage and frequency" 
            rows={3} 
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="surgeries">Past Surgeries/Hospitalizations</Label>
          <Textarea 
            id="surgeries" 
            placeholder="Include dates and reasons for surgeries/hospitalizations" 
            rows={3} 
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="foodAllergies">Food Allergies</Label>
          <Textarea 
            id="foodAllergies" 
            placeholder="List any food allergies" 
            rows={2} 
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="drugAllergies">Drug Allergies</Label>
          <Textarea 
            id="drugAllergies" 
            placeholder="List any drug allergies" 
            rows={2} 
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="environmentalAllergies">Environmental Allergies</Label>
          <Textarea 
            id="environmentalAllergies" 
            placeholder="List any environmental allergies" 
            rows={2} 
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="familyHistory">Family Medical History</Label>
          <Textarea 
            id="familyHistory" 
            placeholder="Please specify family medical history details" 
            rows={3} 
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="vaccinations">Vaccination History</Label>
          <Textarea 
            id="vaccinations" 
            placeholder="Please specify vaccination dates and details" 
            rows={3} 
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="infections">Infection History</Label>
          <Textarea 
            id="infections" 
            placeholder="Please specify infection history and treatment details" 
            rows={3} 
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastMenstrual">Last Menstrual Period (if applicable)</Label>
          <Input id="lastMenstrual" type="date" placeholder="dd/mm/yyyy" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="reproductiveHistory">Reproductive History</Label>
          <Textarea 
            id="reproductiveHistory" 
            placeholder="Include obstetric/gynecologic history, pregnancies, etc." 
            rows={3} 
          />
        </div>
      </div>
    </div>
  );
};
