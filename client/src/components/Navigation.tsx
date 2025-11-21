import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";
import { MessageCircle } from "lucide-react";

export function Navigation() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const categories = [
    { name: "IT / Computer Engineering", slug: "it" },
    { name: "Computer Science", slug: "cs" },
    { name: "Electronics & Telecom", slug: "ece" },
    { name: "Electrical", slug: "electrical" },
    { name: "Mechanical", slug: "mechanical" },
    { name: "Civil Engineering", slug: "civil" },
    { name: "Diploma Projects", slug: "diploma" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href="/">
              <a className="flex items-center gap-2 hover-elevate active-elevate-2 rounded-md px-3 py-2 -ml-3" data-testid="link-home">
                <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-lg">TF</span>
                </div>
                <span className="font-heading font-bold text-xl hidden sm:block">TechFinalYear</span>
              </a>
            </Link>

            <div className="hidden lg:flex items-center gap-1">
              <Link href="/categories">
                <a className={`px-3 py-2 rounded-md text-sm font-medium hover-elevate active-elevate-2 ${location === '/categories' ? 'bg-accent' : ''}`} data-testid="link-categories">
                  Browse Projects
                </a>
              </Link>
              
              <Link href="/custom-request">
                <a className={`px-3 py-2 rounded-md text-sm font-medium hover-elevate active-elevate-2 ${location === '/custom-request' ? 'bg-accent' : ''}`} data-testid="link-custom">
                  Custom Project
                </a>
              </Link>
              
              <Link href="/about">
                <a className={`px-3 py-2 rounded-md text-sm font-medium hover-elevate active-elevate-2 ${location === '/about' ? 'bg-accent' : ''}`} data-testid="link-about">
                  About Us
                </a>
              </Link>
              
              <Link href="/contact">
                <a className={`px-3 py-2 rounded-md text-sm font-medium hover-elevate active-elevate-2 ${location === '/contact' ? 'bg-accent' : ''}`} data-testid="link-contact">
                  Contact
                </a>
              </Link>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <Button asChild variant="outline" size="sm" data-testid="button-whatsapp-nav">
              <a href="https://wa.me/7028945423" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp Support
              </a>
            </Button>
            <Button asChild size="sm" data-testid="button-order-custom-nav">
              <Link href="/custom-request">
                <a>Order Custom Project</a>
              </Link>
            </Button>
          </div>

          <button
            className="lg:hidden p-2 hover-elevate active-elevate-2 rounded-md"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden border-t bg-background">
          <div className="px-4 py-4 space-y-2">
            <Link href="/categories">
              <a className="block px-3 py-2 rounded-md text-sm font-medium hover-elevate active-elevate-2" data-testid="link-mobile-categories">
                Browse Projects
              </a>
            </Link>
            <Link href="/custom-request">
              <a className="block px-3 py-2 rounded-md text-sm font-medium hover-elevate active-elevate-2" data-testid="link-mobile-custom">
                Custom Project
              </a>
            </Link>
            <Link href="/about">
              <a className="block px-3 py-2 rounded-md text-sm font-medium hover-elevate active-elevate-2" data-testid="link-mobile-about">
                About Us
              </a>
            </Link>
            <Link href="/contact">
              <a className="block px-3 py-2 rounded-md text-sm font-medium hover-elevate active-elevate-2" data-testid="link-mobile-contact">
                Contact
              </a>
            </Link>
            <div className="pt-2 space-y-2">
              <Button asChild variant="outline" className="w-full" size="sm" data-testid="button-mobile-whatsapp">
                <a href="https://wa.me/7028945423" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  WhatsApp Support
                </a>
              </Button>
              <Button asChild className="w-full" size="sm" data-testid="button-mobile-order">
                <Link href="/custom-request">
                  <a>Order Custom Project</a>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
