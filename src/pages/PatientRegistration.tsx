import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Save, ChevronLeft, ChevronRight } from "lucide-react";

const totalSteps = 7;
const stepTitles = [
  "Personal Information",
  "Lifestyle & Social History",
  "Medical History",
  "Current Health Status",
  "Psychometric Assessment",
  "AYUSH Profile",
  "Image Capture",
];

const PatientRegistration = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    occupation: "",
    exercise: "",
    diet: "",
    sleep: "",
    conditions: "",
    medications: "",
    allergies: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { toast } = useToast();
  const navigate = useNavigate();

  // NEW: Load saved progress from sessionStorage when the component mounts
  useEffect(() => {
    const savedStep = sessionStorage.getItem("patientRegistrationStep");
    const savedData = sessionStorage.getItem("patientFormData");

    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
    if (savedStep) {
      setCurrentStep(parseInt(savedStep, 10));
    }
  }, []);

  const progress = (currentStep / totalSteps) * 100;

  // NEW: Generic handler to update the state for any input
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  // UPDATED: handleNext now calls the final submission logic
  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // UPDATED: handleSave now saves the entire form data, not just the step
  const handleSave = () => {
    sessionStorage.setItem("patientRegistrationStep", currentStep.toString());
    sessionStorage.setItem("patientFormData", JSON.stringify(formData));
    toast({
      title: "Progress Saved",
      description: "You can continue later from where you left off.",
    });
  };

  // NEW: The final submission handler function
  const handleSubmit = async () => {
    setIsSubmitting(true);
    const registrationData = new FormData();

    // User Account Data
    registrationData.append("username", formData.email);
    registrationData.append("email", formData.email);
    registrationData.append("password", formData.password);

    // Profile Data (mapping to snake_case for Django)
    registrationData.append(
      "full_name",
      `${formData.firstName} ${formData.lastName}`
    );
    registrationData.append("date_of_birth", formData.dob);
    registrationData.append("phone_number", formData.phone);
    registrationData.append("address", formData.address);
    registrationData.append("occupation", formData.occupation);
    // ... append any other fields you want to save

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/register/patient/",
        {
          method: "POST",
          body: registrationData,
        }
      );

      if (response.ok) {
        toast({
          title: "Registration Successful!",
          description: "Redirecting to homepage...",
        });
        sessionStorage.removeItem("patientRegistrationStep");
        sessionStorage.removeItem("patientFormData");
        setIsSuccess(true);
        setTimeout(() => navigate("/"), 1500);
      } else {
        const errorData = await response.json();
        console.error("Registration failed:", errorData);
        toast({
          variant: "destructive",
          title: "Registration failed",
          description: "Please check console for details.",
        });
      }
    } catch (error) {
      console.error("An error occurred:", error);
      toast({
        variant: "destructive",
        title: "An error occurred",
        description: "Could not connect to the server.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1 py-12 bg-muted/30">
        <div
          className={`container mx-auto px-4 max-w-4xl transition-opacity duration-1000 ${
            isSuccess ? "opacity-0" : "opacity-100"
          }`}
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-heading font-bold mb-2">
              Patient Registration
            </h1>
            <p className="text-muted-foreground">
              Create your comprehensive health profile
            </p>
          </div>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-muted-foreground">
                Step {currentStep} of {totalSteps}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSave}
                className="text-primary hover:text-primary-dark"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Progress
              </Button>
            </div>
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-muted-foreground mt-2">
              {stepTitles[currentStep - 1]}
            </p>
          </div>

          <Card className="border-border shadow-card">
            <CardHeader>
              <CardTitle>{stepTitles[currentStep - 1]}</CardTitle>
              <CardDescription>
                Please provide accurate information for better healthcare
                recommendations
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="John"
                        className="mt-1.5"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Doe"
                        className="mt-1.5"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="dob">Date of Birth</Label>
                    <Input
                      id="dob"
                      value={formData.dob}
                      onChange={handleChange}
                      type="date"
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      type="email"
                      placeholder="john@example.com"
                      className="mt-1.5"
                    />
                  </div>
                  {/* NEW: Password field added */}
                  <div>
                    <Label htmlFor="password">Create Password</Label>
                    <Input
                      id="password"
                      value={formData.password}
                      onChange={handleChange}
                      type="password"
                      placeholder="Minimum 8 characters"
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      type="tel"
                      placeholder="+91 98765 43210"
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Textarea
                      id="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Enter your complete address"
                      className="mt-1.5"
                    />
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="occupation">Occupation</Label>
                    <Input
                      id="occupation"
                      value={formData.occupation}
                      onChange={handleChange}
                      placeholder="Software Engineer"
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="exercise">Exercise Routine</Label>
                    <Textarea
                      id="exercise"
                      value={formData.exercise}
                      onChange={handleChange}
                      placeholder="Describe your typical exercise routine"
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="diet">Dietary Preferences</Label>
                    <Textarea
                      id="diet"
                      value={formData.diet}
                      onChange={handleChange}
                      placeholder="Vegetarian, Non-vegetarian, Vegan, etc."
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="sleep">Sleep Pattern</Label>
                    <Input
                      id="sleep"
                      value={formData.sleep}
                      onChange={handleChange}
                      placeholder="Average hours per night"
                      className="mt-1.5"
                    />
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="conditions">
                      Existing Medical Conditions
                    </Label>
                    <Textarea
                      id="conditions"
                      value={formData.conditions}
                      onChange={handleChange}
                      placeholder="List any chronic conditions, past surgeries, etc."
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="medications">Current Medications</Label>
                    <Textarea
                      id="medications"
                      value={formData.medications}
                      onChange={handleChange}
                      placeholder="List all medications you are currently taking"
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="allergies">Allergies</Label>
                    <Textarea
                      id="allergies"
                      value={formData.allergies}
                      onChange={handleChange}
                      placeholder="Food allergies, drug allergies, etc."
                      className="mt-1.5"
                    />
                  </div>
                </div>
              )}

              {currentStep > 3 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    Step {currentStep} content will be implemented here.
                  </p>
                </div>
              )}

              <div className="flex gap-4 pt-4 border-t border-border">
                {currentStep > 1 && (
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    className="flex-1"
                    disabled={isSubmitting}
                  >
                    Previous
                  </Button>
                )}
                <Button
                  onClick={handleNext}
                  className="flex-1 bg-primary hover:bg-primary-dark"
                  disabled={isSubmitting}
                >
                  {currentStep === totalSteps
                    ? isSubmitting
                      ? "Submitting..."
                      : "Complete Registration"
                    : "Continue"}
                  {currentStep < totalSteps && (
                    <ChevronRight className="w-4 h-4 ml-2" />
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6 border-primary/20 bg-primary/5">
            <CardContent className="p-4 flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-primary mt-2" />
              <div className="flex-1">
                <p className="text-sm">
                  <strong className="text-primary">Your data is secure:</strong>{" "}
                  All information is encrypted and HIPAA-compliant. Your
                  progress is automatically saved.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PatientRegistration;
