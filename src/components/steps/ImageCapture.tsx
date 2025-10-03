import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Camera } from "lucide-react";

export const ImageCapture = ({ data, handleFileChange }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Camera className="w-5 h-5 text-primary" />
        <div>
          <h2 className="text-xl font-semibold">Image Capture</h2>
          <p className="text-sm text-muted-foreground">
            Optionally, upload images for analysis.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border rounded-lg p-4 space-y-3">
          <div>
            <Label className="text-base font-medium">Tongue Image</Label>
            <p className="text-sm text-muted-foreground mt-1">
              Capture a clear image of your tongue.
            </p>
          </div>
          <Input
            id="tongueImage"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
          {data.tongueImage && (
            <p className="text-xs text-muted-foreground">
              Selected: {data.tongueImage.name}
            </p>
          )}
        </div>
        <div className="border rounded-lg p-4 space-y-3">
          <div>
            <Label className="text-base font-medium">Eye Images</Label>
            <p className="text-sm text-muted-foreground mt-1">
              Capture clear images of both eyes.
            </p>
          </div>
          <Input
            id="eyeImage"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
          {data.eyeImage && (
            <p className="text-xs text-muted-foreground">
              Selected: {data.eyeImage.name}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
