import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Save } from "lucide-react";

const totalSteps = 7;
const stepTitles = [
  "Personal Information",
  "Lifestyle & Social History",
  "Medical History",
  "Current Health Status",
  "Psychometric Assessment",
  "AYUSH Profile",
  "Image Capture"
];

const PatientRegistration = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const { toast } = useToast();
  
  const progress = (currentStep / totalSteps) * 100;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      // Save to sessionStorage
      sessionStorage.setItem("patientRegistrationStep", currentStep.toString());
    } else {
      toast({
        title: "Registration Complete",
        description: "Your health profile has been created successfully",
      });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSave = () => {
    sessionStorage.setItem("patientRegistrationStep", currentStep.toString());
    toast({
      title: "Progress Saved",
      description: "You can continue later from where you left off",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 py-12 bg-muted/30">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-heading font-bold mb-2">
              Patient Registration
            </h1>
            <p className="text-muted-foreground">
              Create your comprehensive health profile
            </p>
          </div>

          {/* Progress Bar */}
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
                Please provide accurate information for better healthcare recommendations
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="John" className="mt-1.5" />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Doe" className="mt-1.5" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="dob">Date of Birth</Label>
                    <Input id="dob" type="date" className="mt-1.5" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="john@example.com" className="mt-1.5" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" placeholder="+91 98765 43210" className="mt-1.5" />
                  </div>
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Textarea id="address" placeholder="Enter your complete address" className="mt-1.5" />
                  </div>
                </div>
              )}

              {/* Step 2: Lifestyle & Social History */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="occupation">Occupation</Label>
                    <Input id="occupation" placeholder="Software Engineer" className="mt-1.5" />
                  </div>
                  <div>
                    <Label htmlFor="exercise">Exercise Routine</Label>
                    <Textarea 
                      id="exercise" 
                      placeholder="Describe your typical exercise routine"
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="diet">Dietary Preferences</Label>
                    <Textarea 
                      id="diet" 
                      placeholder="Vegetarian, Non-vegetarian, Vegan, etc."
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="sleep">Sleep Pattern</Label>
                    <Input 
                      id="sleep" 
                      placeholder="Average hours per night"
                      className="mt-1.5"
                    />
                  </div>
                </div>
              )}

              {/* Step 3: Medical History */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="conditions">Existing Medical Conditions</Label>
                    <Textarea 
                      id="conditions" 
                      placeholder="List any chronic conditions, past surgeries, etc."
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="medications">Current Medications</Label>
                    <Textarea 
                      id="medications" 
                      placeholder="List all medications you are currently taking"
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="allergies">Allergies</Label>
                    <Textarea 
                      id="allergies" 
                      placeholder="Food allergies, drug allergies, etc."
                      className="mt-1.5"
                    />
                  </div>
                </div>
              )}

              {/* Placeholder for remaining steps */}
              {currentStep > 3 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    Step {currentStep} content will be implemented with full functionality
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    This is a framework demonstrating the multi-step form structure
                  </p>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex gap-4 pt-4 border-t border-border">
                {currentStep > 1 && (
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    className="flex-1"
                  >
                    Previous
                  </Button>
                )}
                <Button
                  onClick={handleNext}
                  className="flex-1 bg-primary hover:bg-primary-dark"
                >
                  {currentStep === totalSteps ? "Complete Registration" : "Continue"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Info Card */}
          <Card className="mt-6 border-primary/20 bg-primary/5">
            <CardContent className="p-4 flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-primary mt-2" />
              <div className="flex-1">
                <p className="text-sm">
                  <strong className="text-primary">Your data is secure:</strong> All information is encrypted and HIPAA-compliant. 
                  Your progress is automatically saved.
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
