import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import type { Project } from "@shared/schema";
import { getImageUrl } from "@/lib/queryClient";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="overflow-hidden hover-elevate active-elevate-2 transition-all duration-300" data-testid={`card-project-${project.id}`}>
      <div className="aspect-video bg-muted overflow-hidden">
        {project.thumbnail ? (
          <img
            src={getImageUrl(project.thumbnail)}
            alt={project.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback if image fails to load
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
            <span className="text-4xl font-heading font-bold text-primary/40">
              {project.title.substring(0, 2).toUpperCase()}
            </span>
          </div>
        )}
      </div>
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-2 mb-3">
          <h3 className="font-heading font-semibold text-lg line-clamp-2" data-testid={`text-title-${project.id}`}>
            {project.title}
          </h3>
        </div>
        <div className="flex flex-wrap gap-2 mb-3">
          <Badge variant="secondary" className="text-xs" data-testid={`badge-branch-${project.id}`}>
            {project.branch}
          </Badge>
          {project.technologies.slice(0, 3).map((tech, idx) => (
            <Badge key={idx} variant="outline" className="text-xs">
              {tech}
            </Badge>
          ))}
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {project.description}
        </p>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-primary" data-testid={`text-price-${project.id}`}>
              ₹{project.price}
            </span>
          </div>
          <Link href={`/project/${project.id}`}>
            <a>
              <Button size="sm" data-testid={`button-view-${project.id}`}>
                View Details
              </Button>
            </a>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
