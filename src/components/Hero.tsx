import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          {/* Badge */}
          <Badge
            variant="secondary"
            className="bg-accent text-accent-foreground px-4 py-1.5 text-sm font-medium"
          >
            Revolutionizing Traditional Medicine
          </Badge>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
            Where Ancient Wisdom Meets AI-Powered Care
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Bringing AYUSH colleges, practitioners, and patients together —
            harnessing AI to preserve wisdom, personalize care, and power the
            future of holistic health.
          </p>

          {/* CTA Buttons - CORRECTED SECTION */}
          <div className="flex justify-center items-center gap-4">
            {/* Dropdown Button using shadcn/ui */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="lg" className="flex items-center gap-2">
                  Start Free Trial
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <Link to="/practitioner-registration">As a Practitioner</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/seeking"> Seeking Consultation </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              size="lg"
              variant="outline"
              className="border-border hover:bg-muted"
            >
              Watch Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
