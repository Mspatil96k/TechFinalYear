import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Award,
  Users,
  CheckCircle,
  MessageCircle,
  FileText,
  Code,
  Presentation,
  HeadphonesIcon,
  Trophy,
  Target,
  Heart,
} from "lucide-react";
import aboutImage from "@assets/generated_images/About_page_workspace_photo_beabd40b.png";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-card border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h1 className="font-heading font-bold text-3xl sm:text-4xl mb-4" data-testid="text-page-title">
            About TechFinalYear
          </h1>
          <p className="text-lg text-muted-foreground">
            Your trusted partner for final year engineering and diploma projects
          </p>
        </div>
      </div>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4">Our Story</Badge>
              <h2 className="font-heading font-bold text-3xl sm:text-4xl mb-6" data-testid="text-story-title">
                Helping Students Achieve Their Project Goals
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  TechFinalYear was founded by a team of experienced engineers who understand the challenges students face during their final year projects. We've been there, and we know how crucial this phase is for your academic success.
                </p>
                <p>
                  With over 3 years of experience in the industry, our team has successfully delivered more than 5000+ projects to students across India. We specialize in providing complete project solutions with 100% support, from conceptualization to final presentation.
                </p>
                <p>
                  Our mission is simple: to ensure every student gets a high-quality project with complete understanding and support, enabling them to excel in their final year and kickstart their careers with confidence.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src={aboutImage}
                alt="Our workspace"
                className="rounded-lg w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl mb-4">Our Experience</h2>
            <p className="text-muted-foreground">Numbers that speak for themselves</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Trophy, value: "500+", label: "Projects Delivered" },
              { icon: Users, value: "450+", label: "Happy Students" },
              { icon: Award, value: "7+", label: "Engineering Branches" },
              { icon: Target, value: "3+", label: "Years of Experience" },
            ].map((stat, idx) => (
              <Card key={idx} className="text-center" data-testid={`stat-card-${idx}`}>
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <stat.icon className="w-6 h-6 text-primary" />
                  </div>
                  <p className="font-heading font-bold text-3xl mb-1">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl mb-4">Our Support Process</h2>
            <p className="text-muted-foreground">How we ensure your success</p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-8">
              {[
                {
                  step: "01",
                  title: "Initial Consultation",
                  description: "We discuss your requirements, branch, technologies, and deadlines to understand your needs perfectly.",
                  icon: MessageCircle,
                },
                {
                  step: "02",
                  title: "Project Development",
                  description: "Our expert team develops your project with clean code, following best practices and industry standards.",
                  icon: Code,
                },
                {
                  step: "03",
                  title: "Documentation & Materials",
                  description: "Complete documentation, project report, PPT presentation, and video demonstration are prepared.",
                  icon: FileText,
                },
                {
                  step: "04",
                  title: "Knowledge Transfer",
                  description: "We explain the entire project, helping you understand every aspect for your presentation and viva.",
                  icon: Presentation,
                },
                {
                  step: "05",
                  title: "Ongoing Support",
                  description: "24/7 support even after delivery to help with any queries, modifications, or presentation preparation.",
                  icon: HeadphonesIcon,
                },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-6" data-testid={`process-step-${idx}`}>
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground font-bold text-xl flex items-center justify-center">
                      {item.step}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start gap-3 mb-2">
                      <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                        <item.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-heading font-semibold text-xl mb-2">{item.title}</h3>
                        <p className="text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl mb-4">Why Students Trust Us</h2>
            <p className="text-muted-foreground">What makes us different</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Heart,
                title: "Student-First Approach",
                description: "We understand student budgets and deadlines. Our pricing is transparent and affordable with no hidden costs.",
              },
              {
                icon: Award,
                title: "Quality Guaranteed",
                description: "Every project is tested and reviewed by our senior developers before delivery. We ensure it meets academic standards.",
              },
              {
                icon: CheckCircle,
                title: "Complete Transparency",
                description: "Regular updates, clear communication, and honest timelines. You'll always know the status of your project.",
              },
              {
                icon: Users,
                title: "Expert Team",
                description: "Our developers have 5+ years of industry experience and expertise across all engineering domains.",
              },
              {
                icon: MessageCircle,
                title: "24/7 Support",
                description: "Stuck at 2 AM before your presentation? We're available round the clock to help you succeed.",
              },
              {
                icon: Trophy,
                title: "Proven Track Record",
                description: "500+ successfully delivered projects with 98% student satisfaction rate speaks for our reliability.",
              },
            ].map((item, idx) => (
              <Card key={idx} className="hover-elevate active-elevate-2 transition-all duration-300" data-testid={`trust-card-${idx}`}>
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-heading font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading font-bold text-3xl mb-4">Ready to Start Your Project?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of successful students who chose TechFinalYear for their final year projects
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="/categories">
              <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover-elevate active-elevate-2 h-9 px-4 py-2" data-testid="button-browse">
                Browse Projects
              </button>
            </a>
            <a href="/custom-request">
              <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover-elevate active-elevate-2 h-9 px-4 py-2" data-testid="button-custom">
                Request Custom Project
              </button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
