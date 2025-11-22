import { useRoute, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ProjectCard } from "@/components/ProjectCard";
import type { Project } from "@shared/schema";
import {
  CheckCircle,
  Download,
  ShoppingCart,
  MessageCircle,
  FileText,
  Code,
  Presentation,
  Video,
  Users,
  Star,
} from "lucide-react";

export default function ProjectDetail() {
  const [, params] = useRoute("/project/:id");
  const projectId = params?.id;

  const { data: project, isLoading } = useQuery<Project>({
    queryKey: ["/api/projects", projectId],
    enabled: !!projectId,
  });

  const { data: relatedProjects } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  const related = relatedProjects?.filter(
    (p) => p.category === project?.category && p.id !== project?.id
  ).slice(0, 4);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse space-y-8">
            <div className="h-12 bg-muted rounded w-2/3"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                <div className="h-64 bg-muted rounded"></div>
                <div className="h-32 bg-muted rounded"></div>
              </div>
              <div className="h-96 bg-muted rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-heading font-bold text-2xl mb-4">Project Not Found</h2>
          <Button asChild>
            <Link href="/categories">
              <a>Browse All Projects</a>
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-card border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap gap-2 mb-3">
                <Badge variant="secondary" data-testid="badge-branch">
                  {project.branch}
                </Badge>
                <Badge variant="outline" data-testid="badge-category">
                  {project.category}
                </Badge>
              </div>
              <h1 className="font-heading font-bold text-3xl sm:text-4xl mb-4" data-testid="text-project-title">
                {project.title}
              </h1>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild variant="outline" data-testid="button-download-sample">
                <a href={project.samplePptUrl || "#"} download>
                  <Download className="w-4 h-4 mr-2" />
                  Download Sample
                </a>
              </Button>
              <Button asChild data-testid="button-order-now">
                <a href="#order-card">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Order Now
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardContent className="p-6">
                <h2 className="font-heading font-semibold text-2xl mb-4">Project Description</h2>
                <p className="text-muted-foreground leading-relaxed" data-testid="text-description">
                  {project.description}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="font-heading font-semibold text-2xl mb-4">Key Features</h2>
                <ul className="space-y-3">
                  {project.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3" data-testid={`feature-${idx}`}>
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="font-heading font-semibold text-2xl mb-4">Technologies Used</h2>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, idx) => (
                    <Badge key={idx} variant="secondary" data-testid={`tech-${idx}`}>
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="font-heading font-semibold text-2xl mb-4">What You'll Receive</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[
                    { icon: Code, label: "Complete Source Code", desc: "Well-documented and commented" },
                    { icon: FileText, label: "Full Documentation", desc: "Project report & user manual" },
                    { icon: Presentation, label: "PPT Presentation", desc: "Ready for your defense" },
                    { icon: Video, label: "Video Demo", desc: "Step-by-step walkthrough" },
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-3" data-testid={`deliverable-${idx}`}>
                      <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold">{item.label}</p>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-20" id="order-card">
              <CardContent className="p-6 space-y-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Project Price</p>
                  <p className="font-heading font-bold text-4xl text-primary" data-testid="text-price">
                    ₹{project.price}
                  </p>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold mb-3">What's Included</h3>
                  <ul className="space-y-2 text-sm">
                    {project.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Separator />

                <div className="bg-muted/50 rounded-md p-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="w-4 h-4 text-primary" />
                    <span className="text-muted-foreground">
                      <strong className="text-foreground">{project.popular || 0}</strong> students ordered this month
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button 
                    asChild
                    className="w-full" 
                    size="lg" 
                    data-testid="button-order-main"
                  >
                    <a 
                      href={`https://wa.me/7028945423?text=Hi! I'm interested in ordering the project: ${encodeURIComponent(project.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      Order This Project
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full"
                    size="lg"
                    data-testid="button-whatsapp-inquiry"
                  >
                    <a href="https://wa.me/7028945423" target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="w-5 h-5 mr-2" />
                      WhatsApp Inquiry
                    </a>
                  </Button>
                </div>

                <p className="text-xs text-muted-foreground text-center">
                  100% Money-back guarantee if not satisfied
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {related && related.length > 0 && (
          <div className="mt-16">
            <h2 className="font-heading font-bold text-2xl sm:text-3xl mb-8">
              Related Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((relProject) => (
                <ProjectCard key={relProject.id} project={relProject} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
