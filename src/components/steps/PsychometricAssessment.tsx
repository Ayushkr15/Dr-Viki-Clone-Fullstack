import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Brain } from "lucide-react";

const questions = [
  "I feel confident about my abilities",
  "I have been feeling down or hopeless",
  "I have trouble concentrating",
  "I feel energetic and motivated",
  "I worry about things frequently",
  "I sleep well and feel rested",
  "I enjoy my daily activities",
  "I feel overwhelmed by my responsibilities",
  "I have good relationships with others",
  "I feel positive about my future",
  "I experience mood swings",
  "I feel calm and relaxed most of the time",
  "I have difficulty making decisions",
  "I feel satisfied with my life",
  "I experience physical tension or pain",
];

export const PsychometricAssessment = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Brain className="w-5 h-5 text-primary" />
        <div>
          <h2 className="text-xl font-semibold">Psychometric Assessment</h2>
          <p className="text-sm text-muted-foreground">Please fill out all required fields to continue</p>
        </div>
      </div>

      <div className="bg-accent/50 p-4 rounded-lg mb-6">
        <p className="text-sm font-medium mb-2">
          Please rate each statement based on how you have felt over the past week.
        </p>
        <p className="text-xs text-muted-foreground">
          1 = Never | 2 = Rarely | 3 = Sometimes | 4 = Often | 5 = Always
        </p>
      </div>

      <div className="space-y-6">
        {questions.map((question, index) => (
          <div key={index} className="border rounded-lg p-4 space-y-3">
            <Label className="text-base">
              Q{index + 1}. {question}
            </Label>
            <RadioGroup defaultValue="3" className="flex gap-4">
              {[1, 2, 3, 4, 5].map((value) => (
                <div key={value} className="flex items-center space-x-2">
                  <RadioGroupItem value={value.toString()} id={`q${index}-${value}`} />
                  <Label htmlFor={`q${index}-${value}`} className="font-normal cursor-pointer">
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
