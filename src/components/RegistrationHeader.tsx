import { Leaf } from "lucide-react";

export const RegistrationHeader = () => {
  return (
    <header className="border-b bg-card">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
            <Leaf className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold">AYUSH Platform</span>
        </div>
        <span className="text-sm text-muted-foreground">
          Patient Registration
        </span>
      </div>
    </header>
  );
};

export default RegistrationHeader;
