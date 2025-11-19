import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import type { Category } from "@shared/schema";
import { 
  Code, 
  Cpu, 
  Radio, 
  Zap, 
  Cog, 
  Building2,
  GraduationCap 
} from "lucide-react";

interface CategoryCardProps {
  category: Category;
}

const iconMap: Record<string, any> = {
  code: Code,
  cpu: Cpu,
  radio: Radio,
  zap: Zap,
  cog: Cog,
  building: Building2,
  graduation: GraduationCap,
};

export function CategoryCard({ category }: CategoryCardProps) {
  const Icon = iconMap[category.icon] || Code;

  return (
    <Link href={`/categories?cat=${category.slug}`}>
      <a data-testid={`link-category-${category.slug}`}>
        <Card className="hover-elevate active-elevate-2 transition-all duration-300 h-full">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Icon className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-heading font-semibold text-lg mb-2" data-testid={`text-category-name-${category.slug}`}>
                  {category.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {category.description}
                </p>
                <Badge variant="secondary" className="text-xs" data-testid={`badge-count-${category.slug}`}>
                  {category.projectCount} Projects
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </a>
    </Link>
  );
}
