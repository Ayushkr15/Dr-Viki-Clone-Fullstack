import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Camera, Upload } from "lucide-react";

const imageSections = [
  {
    title: "Tongue Image",
    description: "Stick out your tongue and capture a clear image",
  },
  {
    title: "Palm Images",
    description: "Capture both palms and back of hands",
  },
  {
    title: "Eye Images",
    description: "Capture clear images of both eyes",
  },
  {
    title: "Skin Images",
    description: "Capture any areas of concern or general skin condition",
  },
  {
    title: "Nail Images",
    description: "Capture fingernails and toenails",
  },
  {
    title: "Other Areas",
    description: "Any other areas of medical interest",
  },
];

export const ImageCapture = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Camera className="w-5 h-5 text-primary" />
        <div>
          <h2 className="text-xl font-semibold">Image Capture</h2>
          <p className="text-sm text-muted-foreground">Please fill out all required fields to continue</p>
        </div>
      </div>

      <div className="bg-accent/50 p-4 rounded-lg mb-6">
        <p className="text-sm font-medium mb-2">
          Please capture clear images of the following body components for AI analysis
        </p>
        <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
          <li>Ensure good lighting for clear images</li>
          <li>Keep the camera steady to avoid blur</li>
          <li>Follow the specific instructions for each image type</li>
        </ul>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {imageSections.map((section, index) => (
          <div key={index} className="border rounded-lg p-4 space-y-3">
            <div>
              <Label className="text-base font-medium">{section.title}</Label>
              <p className="text-sm text-muted-foreground mt-1">{section.description}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1">
                <Camera className="w-4 h-4 mr-2" />
                Capture
              </Button>
              <Button variant="outline" className="flex-1">
                <Upload className="w-4 h-4 mr-2" />
                Upload
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
