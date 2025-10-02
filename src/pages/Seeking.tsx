import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const [patientData, setPatientData] = useState({
    fullName: "",
    dob: "",
    gender: "",
    maritalStatus: "",
    occupation: "",
    educationLevel: "",
    phoneNumber: "",
    email: "",
    password: "",
    address: "",
    smokingStatus: "",
    alcoholConsumption: "",
    dietType: "",
    mealsPerDay: "",
    exerciseFrequency: "",
    sleepQuality: "",
    chronicConditions: {},
    medications: "",
    allergies: "",
    weight: "",
    height: "",
    bloodPressure: "",
    symptoms: "",
    stressLevel: 5,
    depressionLevel: 5,
    anxietyLevel: 5,
    psychometricAnswers: {},
    vata: "",
    pitta: "",
    kapha: "",
    prakriti: "",
    tongueImage: null as File | null,
    eyeImage: null as File | null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setPatientData(prev => ({ ...prev, [id]: value }));
  };
  const handleSelectChange = (id: string, value: string) => {
    setPatientData(prev => ({ ...prev, [id]: value }));
  };
  const handleCheckboxChange = (
    group: string,
    id: string,
    checked: boolean
  ) => {
    setPatientData(prev => ({
      ...prev,
      [group]: { ...(prev[group] as object), [id]: checked },
    }));
  };
  const handleRadioChange = (
    group: string,
    questionId: string,
    value: string
  ) => {
    setPatientData(prev => ({
      ...prev,
      [group]: { ...(prev[group] as object), [questionId]: value },
    }));
  };
  const handleSliderChange = (id: string, value: number[]) => {
    setPatientData(prev => ({ ...prev, [id]: value[0] }));
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, files } = e.target;
    if (files && files.length > 0) {
      setPatientData(prev => ({ ...prev, [id]: files[0] }));
    }
  };


  const handleSubmit = async () => {
    const registrationData = new FormData();

    // User Account Data
    registrationData.append("username", patientData.email);
    registrationData.append("email", patientData.email);
    registrationData.append("password", patientData.password);

    // FIX: Manually map frontend camelCase state to backend snake_case fields
    registrationData.append("full_name", patientData.fullName);
    registrationData.append("date_of_birth", patientData.dob);
    registrationData.append("gender", patientData.gender);
    registrationData.append("marital_status", patientData.maritalStatus);
    registrationData.append("occupation", patientData.occupation);
    registrationData.append("phone_number", patientData.phoneNumber);
    registrationData.append("address", patientData.address);
    registrationData.append("smoking_status", patientData.smokingStatus);
    // ... continue this pattern for ALL other text/select fields ...

    // You don't need to change the file handling
    if (patientData.tongueImage) {
      registrationData.append("tongue_image", patientData.tongueImage);
    }
    if (patientData.eyeImage) {
      registrationData.append("eye_image", patientData.eyeImage);
    }

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/register/patient/",
        {
          method: "POST",
          body: registrationData,
        }
      );

      if (response.ok) {
        toast.success(
          "Registration Successful! Your account has been created."
        );
        setIsSuccess(true);
        setTimeout(() => navigate("/"), 1000);
      } else {
        const errorData = await response.json();
        console.error("Registration failed:", errorData);
        toast.error(
          "Registration failed. The server reported an error. See console for details."
        );
      }
    } catch (error) {
      console.error("An error occurred:", error);
      toast.error("An error occurred during submission.");
    }
  };

  const handleNext = () => {
    if (currentStep < 7) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const renderStep = () => {
    const props = {
      data: patientData,
      handleChange,
      handleSelectChange,
      handleCheckboxChange,
      handleRadioChange,
      handleSliderChange,
      handleFileChange,
    };
    switch (currentStep) {
      case 1:
        return <PersonalInformation {...props} />;
      case 2:
        return <LifestyleHistory {...props} />;
      case 3:
        return <MedicalHistory {...props} />;
      case 4:
        return <CurrentHealthStatus {...props} />;
      case 5:
        return <PsychometricAssessment {...props} />;
      case 6:
        return <AyushProfile {...props} />;
      case 7:
        return <ImageCapture {...props} />;
      default:
        return <PersonalInformation {...props} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <RegistrationHeader />
      <StepProgress currentStep={currentStep} />
      <main className="container mx-auto px-4 py-8">
        <Card
          className={`max-w-4xl mx-auto transition-opacity duration-1000 ${
            isSuccess ? "opacity-0" : "opacity-100"
          }`}
        >
          <CardContent className="p-6 md:p-8">
            {renderStep()}
            <div className="flex justify-between mt-8 pt-6 border-t">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1}
              >
                <ChevronLeft className="w-4 h-4 mr-2" /> Previous
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
