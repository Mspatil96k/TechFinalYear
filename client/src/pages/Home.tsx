import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CategoryCard } from "@/components/CategoryCard";
import { TestimonialCard } from "@/components/TestimonialCard";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { 
  CheckCircle, 
  FileText, 
  Wrench, 
  BookOpen,
  MessageCircle,
  ShoppingCart,
  Package,
  Users,
  Award,
  Calendar,
  ArrowRight
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertInquirySchema, type InsertInquiry, type Category, type Testimonial } from "@shared/schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import heroImage from "@assets/generated_images/Homepage_hero_engineering_students_7b530f3f.png";

export default function Home() {
  const { toast } = useToast();
  
  const { data: categories, isLoading: categoriesLoading } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const { data: testimonials, isLoading: testimonialsLoading } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials"],
  });

  const form = useForm<InsertInquiry>({
    resolver: zodResolver(insertInquirySchema),
    defaultValues: {
      name: "",
      branch: "",
      whatsapp: "",
      requirement: "",
    },
  });

  const inquiryMutation = useMutation({
    mutationFn: async (data: InsertInquiry) => {
      return apiRequest("POST", "/api/inquiries", data);
    },
    onSuccess: () => {
      toast({
        title: "Inquiry Submitted!",
        description: "We'll contact you on WhatsApp within 24 hours.",
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["/api/inquiries"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit inquiry. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertInquiry) => {
    inquiryMutation.mutate(data);
  };

  return (
    <div className="min-h-screen">
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Engineering students working on projects"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl text-white mb-6" data-testid="text-hero-title">
            Engineering & Diploma Final Year Projects
            <span className="block text-primary-foreground mt-2">With Full Support</span>
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Get ready-made or custom projects with 100% guidance. Complete code, documentation, PPT, and expert support included.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg" variant="default" className="bg-primary/90 backdrop-blur border border-primary-border" data-testid="button-hero-browse">
              <Link href="/categories">
                <a>
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Browse Projects
                </a>
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-white/10 backdrop-blur text-white border-white/20 hover:bg-white/20" data-testid="button-hero-custom">
              <Link href="/custom-request">
                <a>
                  <Wrench className="w-5 h-5 mr-2" />
                  Order Custom Project
                </a>
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-white/10 backdrop-blur text-white border-white/20 hover:bg-white/20" data-testid="button-hero-whatsapp">
              <a href="https://wa.me/7028945423" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-5 h-5 mr-2" />
                WhatsApp Support
              </a>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-8 bg-card border-y">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Package, label: "500+ Projects", sublabel: "Delivered" },
              { icon: MessageCircle, label: "24/7 Support", sublabel: "Available" },
              { icon: CheckCircle, label: "100% Success", sublabel: "Rate" },
              { icon: Award, label: "Money-Back", sublabel: "Guarantee" },
            ].map((item, idx) => (
              <div key={idx} className="text-center" data-testid={`trust-indicator-${idx}`}>
                <item.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="font-semibold text-lg">{item.label}</p>
                <p className="text-sm text-muted-foreground">{item.sublabel}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl sm:text-4xl mb-4" data-testid="text-features-title">
              Why Choose TechFinalYear?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Complete support for your final year project from start to finish
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: CheckCircle,
                title: "100% Project Support",
                description: "Complete guidance from project selection to final presentation with expert mentorship.",
              },
              {
                icon: Package,
                title: "Ready-Made Projects",
                description: "Browse our extensive collection of tested and approved projects across all engineering branches.",
              },
              {
                icon: Wrench,
                title: "Custom Project Development",
                description: "Get your unique project idea built by our expert team with full documentation and support.",
              },
              {
                icon: FileText,
                title: "Complete Documentation",
                description: "Receive full documentation, code, PPT presentations, and video demonstrations.",
              },
            ].map((feature, idx) => (
              <Card key={idx} className="hover-elevate active-elevate-2 transition-all duration-300" data-testid={`card-feature-${idx}`}>
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-xl mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl sm:text-4xl mb-4" data-testid="text-categories-title">
              Browse Projects by Category
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore projects across all engineering and diploma branches
            </p>
          </div>

          {categoriesLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} className="h-32 animate-pulse bg-muted"></Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories?.slice(0, 6).map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          )}

          <div className="text-center mt-8">
            <Button asChild variant="outline" data-testid="button-view-all-categories">
              <Link href="/categories">
                <a>
                  View All Categories
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl sm:text-4xl mb-4" data-testid="text-how-it-works-title">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Simple steps to get your project delivered
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Browse & Choose", description: "Select from ready-made projects or request a custom one", icon: ShoppingCart },
              { step: "02", title: "Order & Customize", description: "Place your order and specify your requirements", icon: Wrench },
              { step: "03", title: "Receive Materials", description: "Get complete code, documentation, and PPT", icon: Package },
              { step: "04", title: "Get Support", description: "24/7 guidance till project completion", icon: MessageCircle },
            ].map((item, idx) => (
              <div key={idx} className="text-center relative" data-testid={`step-${idx}`}>
                <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground font-bold text-2xl flex items-center justify-center mx-auto mb-4">
                  {item.step}
                </div>
                <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl sm:text-4xl mb-4" data-testid="text-testimonials-title">
              What Students Say
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Success stories from students across India
            </p>
          </div>

          {testimonialsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <Card key={i} className="h-48 animate-pulse bg-muted"></Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials?.slice(0, 3).map((testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-16 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "5000+", label: "Projects Completed" },
              { value: "4.8/5", label: "Student Rating" },
              { value: "7", label: "Categories" },
              { value: "5+", label: "Years Experience" },
            ].map((stat, idx) => (
              <div key={idx} data-testid={`stat-${idx}`}>
                <p className="font-heading font-bold text-4xl mb-2">{stat.value}</p>
                <p className="text-sm opacity-90">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-heading font-bold text-3xl sm:text-4xl mb-4" data-testid="text-cta-title">
                Need a Custom Project?
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Share your project idea and requirements. Our expert team will build a custom solution tailored to your needs with complete support and documentation.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span>Unique project implementation</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span>Complete source code & documentation</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span>Deadline-based delivery</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span>24/7 support till completion</span>
                </li>
              </ul>
            </div>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-heading font-semibold text-xl mb-4">Quick Inquiry</h3>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your name" {...field} data-testid="input-inquiry-name" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="branch"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Branch</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Computer Science" {...field} data-testid="input-inquiry-branch" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="whatsapp"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>WhatsApp Number</FormLabel>
                          <FormControl>
                            <Input placeholder="+91 98765 43210" {...field} data-testid="input-inquiry-whatsapp" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="requirement"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Brief Requirement</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Describe your project needs..."
                              className="resize-none"
                              rows={3}
                              {...field}
                              data-testid="input-inquiry-requirement"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full" disabled={inquiryMutation.isPending} data-testid="button-submit-inquiry">
                      {inquiryMutation.isPending ? "Submitting..." : "Submit Inquiry"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
