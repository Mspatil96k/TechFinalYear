import { Link } from "wouter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Facebook, Twitter, Instagram, Linkedin, Mail } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">About TechFinalYear</h3>
            <p className="text-sm text-muted-foreground mb-4">
              We provide complete support for engineering and diploma final year projects with 100% guidance, documentation, and code.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 rounded-md bg-secondary flex items-center justify-center hover-elevate active-elevate-2" data-testid="link-facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-md bg-secondary flex items-center justify-center hover-elevate active-elevate-2" data-testid="link-twitter">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-md bg-secondary flex items-center justify-center hover-elevate active-elevate-2" data-testid="link-instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-md bg-secondary flex items-center justify-center hover-elevate active-elevate-2" data-testid="link-linkedin">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/categories">
                  <a className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-browse">Browse Projects</a>
                </Link>
              </li>
              <li>
                <Link href="/custom-request">
                  <a className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-custom">Custom Project Request</a>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <a className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-about">About Us</a>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <a className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-contact">Contact</a>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/categories?cat=it" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-it">IT / Computer Engineering</a></li>
              <li><a href="/categories?cat=cs" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-cs">Computer Science</a></li>
              <li><a href="/categories?cat=ece" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-ece">Electronics & Telecom</a></li>
              <li><a href="/categories?cat=mechanical" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-mechanical">Mechanical</a></li>
              <li><a href="/categories?cat=civil" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-civil">Civil Engineering</a></li>
              <li><a href="/categories?cat=diploma" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-diploma">Diploma Projects</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Email: support@techfinalyear.com</li>
              <li>Phone: +91 7028945423</li>
              <li>WhatsApp: +91 7028945423</li>
              <li className="pt-2">
                <div className="flex gap-2">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" alt="Stripe" className="h-6 opacity-60" />
                  <img src="https://razorpay.com/assets/razorpay-glyph.svg" alt="Razorpay" className="h-6 opacity-60" />
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} TechFinalYear. All rights reserved. Helping students achieve their project goals with complete support.</p>
        </div>
      </div>
    </footer>
  );
}
