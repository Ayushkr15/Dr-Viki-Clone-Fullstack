import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, X, Leaf, ChevronDown } from "lucide-react";
import { useState } from "react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 font-semibold text-lg"
          >
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            Dr. Viki
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </a>
            <a
              href="#solutions"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Solutions
            </a>
            <a
              href="#about"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </a>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm">
                  Get Started
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link
                    to="/practitioner-registration"
                    className="w-full cursor-pointer"
                  >
                    As a Practitioner
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/seeking" className="w-full cursor-pointer">
                    Seeking Consultation
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4 border-t border-border">
            <a
              href="#features"
              className="block py-2 text-sm text-muted-foreground hover:text-foreground"
              onClick={closeMenu}
            >
              Features
            </a>
            <a
              href="#solutions"
              className="block py-2 text-sm text-muted-foreground hover:text-foreground"
              onClick={closeMenu}
            >
              Solutions
            </a>
            <a
              href="#about"
              className="block py-2 text-sm text-muted-foreground hover:text-foreground"
              onClick={closeMenu}
            >
              About
            </a>
            <div className="flex flex-col gap-2 pt-4">
              <Button variant="ghost" size="sm" className="w-full">
                Sign In
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    size="sm"
                    className="w-full justify-center bg-[#80A1BA] hover:bg-[#80A1BA]/90"
                  >
                    Get Started
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-[calc(100vw-2rem)]"
                >
                  <DropdownMenuItem asChild>
                    <Link
                      to="/practitioner-registration"
                      className="w-full cursor-pointer"
                      onClick={closeMenu}
                    >
                      As a Practitioner
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      to="/seeking"
                      className="w-full cursor-pointer"
                      onClick={closeMenu}
                    >
                      Seeking Consultation
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
