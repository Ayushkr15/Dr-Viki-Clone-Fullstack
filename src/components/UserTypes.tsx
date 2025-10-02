import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, Stethoscope, User } from "lucide-react";

const userTypes = [
  {
    icon: GraduationCap,
    title: "For Colleges",
    subtitle: "Educational institutions and training centers",
    features: [
      "Student data management",
      "Clinical training records",
      "Research data collection",
      "Institutional analytics"
    ]
  },
  {
    icon: Stethoscope,
    title: "For Practitioners",
    subtitle: "Individual doctors and healthcare providers",
    features: [
      "Patient management system",
      "AI-assisted diagnosis",
      "Treatment planning tools",
      "Practice analytics"
    ]
  },
  {
    icon: User,
    title: "For Patients",
    subtitle: "Individuals seeking AYUSH treatments",
    features: [
      "Health profile management",
      "Practitioner communication",
      "Treatment tracking",
      "Wellness insights"
    ]
  }
];

const UserTypes = () => {
  return (
    <section id="solutions" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Tailored for Every User
          </h2>
          <p className="text-lg text-muted-foreground">
            Specialized solutions for different stakeholders in the AYUSH ecosystem
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {userTypes.map((type, index) => {
            const Icon = type.icon;
            return (
              <Card 
                key={index} 
                className="border-border bg-card hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-8 space-y-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold mb-2">
                      {type.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {type.subtitle}
                    </p>
                  </div>
                  <ul className="space-y-3">
                    {type.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-2 text-sm">
                        <span className="text-primary mt-1">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    variant="outline"
                    className="w-full border-border hover:bg-muted"
                  >
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default UserTypes;
