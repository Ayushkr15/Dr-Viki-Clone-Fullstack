import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { 
  User, 
  Heart, 
  FileText, 
  Activity, 
  Brain, 
  Sparkles, 
  Camera 
} from "lucide-react";

const steps = [
  { id: 1, label: "Personal Information", icon: User },
  { id: 2, label: "Lifestyle & Social History", icon: Heart },
  { id: 3, label: "Medical History", icon: FileText },
  { id: 4, label: "Current Health Status", icon: Activity },
  { id: 5, label: "Psychometric Assessment", icon: Brain },
  { id: 6, label: "AYUSH Profile", icon: Sparkles },
  { id: 7, label: "Image Capture", icon: Camera },
];

interface StepProgressProps {
  currentStep: number;
}

export const StepProgress = ({ currentStep }: StepProgressProps) => {
  const progress = (currentStep / steps.length) * 100;

  return (
    <div className="w-full bg-card border-b">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Patient Registration</h1>
          <span className="text-sm text-muted-foreground">
            Step {currentStep} of {steps.length}
          </span>
        </div>
        
        <Progress value={progress} className="mb-6 h-2" />
        
        <div className="flex flex-wrap gap-2">
          {steps.map((step) => {
            const Icon = step.icon;
            const isActive = step.id === currentStep;
            const isCompleted = step.id < currentStep;
            
            return (
              <button
                key={step.id}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors",
                  isActive && "bg-primary text-primary-foreground",
                  isCompleted && "bg-secondary text-secondary-foreground",
                  !isActive && !isCompleted && "bg-muted/50 text-muted-foreground"
                )}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden md:inline">{step.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
