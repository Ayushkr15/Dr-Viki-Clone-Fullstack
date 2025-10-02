import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Brain } from "lucide-react";

const questions = [
  { id: "q1", text: "I feel confident about my abilities" },
  { id: "q2", text: "I have been feeling down or hopeless" },
  { id: "q3", text: "I have trouble concentrating" },
  { id: "q4", text: "I feel energetic and motivated" },
];

export const PsychometricAssessment = ({ data, handleRadioChange }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Brain className="w-5 h-5 text-primary" />
        <div>
          <h2 className="text-xl font-semibold">Psychometric Assessment</h2>
          <p className="text-sm text-muted-foreground">
            Please rate each statement based on how you have felt over the past
            week.
          </p>
        </div>
      </div>
      <div className="bg-accent/50 p-4 rounded-lg">
        <p className="text-xs text-muted-foreground">
          1 = Never | 2 = Rarely | 3 = Sometimes | 4 = Often | 5 = Always
        </p>
      </div>
      <div className="space-y-6">
        {questions.map((question, index) => (
          <div key={index} className="border rounded-lg p-4 space-y-3">
            <Label className="text-base">
              Q{index + 1}. {question.text}
            </Label>
            <RadioGroup
              value={data.psychometricAnswers[question.id] || ""}
              onValueChange={value =>
                handleRadioChange("psychometricAnswers", question.id, value)
              }
              className="flex gap-4"
            >
              {[1, 2, 3, 4, 5].map(value => (
                <div key={value} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={String(value)}
                    id={`${question.id}-${value}`}
                  />
                  <Label
                    htmlFor={`${question.id}-${value}`}
                    className="font-normal cursor-pointer"
                  >
                    {value}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        ))}
      </div>
    </div>
  );
};
