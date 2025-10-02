import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { FileText } from "lucide-react";

const commonConditions = [
  "Diabetes",
  "Hypertension",
  "Heart Disease",
  "Asthma",
  "Thyroid Disorders",
];

export const MedicalHistory = ({
  data,
  handleChange,
  handleCheckboxChange,
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <FileText className="w-5 h-5 text-primary" />
        <div>
          <h2 className="text-xl font-semibold">Medical History</h2>
          <p className="text-sm text-muted-foreground">
            Please provide your medical background.
          </p>
        </div>
      </div>
      <div className="space-y-6">
        <div className="space-y-3">
          <Label>Chronic Conditions</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {commonConditions.map(condition => (
              <div key={condition} className="flex items-center space-x-2">
                <Checkbox
                  id={condition}
                  checked={!!data.chronicConditions[condition]}
                  onCheckedChange={checked =>
                    handleCheckboxChange(
                      "chronicConditions",
                      condition,
                      checked
                    )
                  }
                />
                <label
                  htmlFor={condition}
                  className="text-sm font-medium leading-none"
                >
                  {condition}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="medications">Current Medications</Label>
          <Textarea
            id="medications"
            placeholder="List all current medications, dosage, and frequency"
            rows={3}
            value={data.medications}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="allergies">Allergies</Label>
          <Textarea
            id="allergies"
            placeholder="List any known food, drug, or environmental allergies"
            rows={3}
            value={data.allergies}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};
