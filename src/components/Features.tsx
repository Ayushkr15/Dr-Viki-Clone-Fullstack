import { Card, CardContent } from "@/components/ui/card";
import { Users, Brain, Shield, ClipboardList, Stethoscope, Smartphone } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Multi-User Platform",
    description: "Connect colleges, practitioners, and patients in one unified ecosystem"
  },
  {
    icon: Brain,
    title: "AI-Powered Analysis",
    description: "Advanced image recognition for body component analysis and diagnosis support"
  },
  {
    icon: Shield,
    title: "Secure Data Management",
    description: "HIPAA-compliant data collection and storage for sensitive medical information"
  },
  {
    icon: ClipboardList,
    title: "Comprehensive Assessment",
    description: "Detailed patient registration with psychometric evaluation and health profiling"
  },
  {
    icon: Stethoscope,
    title: "Traditional Medicine Focus",
    description: "Specialized tools for Ayurveda, Yoga, Naturopathy, Unani, Siddha, and Homeopathy"
  },
  {
    icon: Smartphone,
    title: "Patient-Practitioner Connect",
    description: "Seamless communication platform with mobile app for doctors and patients"
  }
];

const Features = () => {
  return (
    <section id="features" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Comprehensive AYUSH Solutions
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to digitize and enhance traditional medicine practices
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index} 
                className="border-border bg-card hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
