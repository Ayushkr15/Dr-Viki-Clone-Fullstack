import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RegistrationHeader } from "@/components/RegistrationHeader";
import { StepProgress } from "@/components/StepProgress";
import { PersonalInformation } from "@/components/steps/PersonalInformation";
import { LifestyleHistory } from "@/components/steps/LifestyleHistory";
import { MedicalHistory } from "@/components/steps/MedicalHistory";
import { CurrentHealthStatus } from "@/components/steps/CurrentHealthStatus";
import { PsychometricAssessment } from "@/components/steps/PsychometricAssessment";
import { AyushProfile } from "@/components/steps/AyushProfile";
import { ImageCapture } from "@/components/steps/ImageCapture";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";

const Seeking = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    if (currentStep < 7) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      toast.success("Registration completed successfully!");
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <PersonalInformation />;
      case 2:
        return <LifestyleHistory />;
      case 3:
        return <MedicalHistory />;
      case 4:
        return <CurrentHealthStatus />;
      case 5:
        return <PsychometricAssessment />;
      case 6:
        return <AyushProfile />;
      case 7:
        return <ImageCapture />;
      default:
        return <PersonalInformation />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <RegistrationHeader />
      <StepProgress currentStep={currentStep} />
      
      <main className="container mx-auto px-4 py-8">
        <Card className="max-w-4xl mx-auto">
          <CardContent className="p-6 md:p-8">
            {renderStep()}

            <div className="flex justify-between mt-8 pt-6 border-t">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1}
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
              <Button onClick={handleNext}>
                {currentStep === 7 ? "Submit" : "Next"}
                {currentStep !== 7 && <ChevronRight className="w-4 h-4 ml-2" />}
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Seeking;
