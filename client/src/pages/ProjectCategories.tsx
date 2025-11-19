import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { ProjectCard } from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import type { Project, Category } from "@shared/schema";
import { Filter, X } from "lucide-react";

export default function ProjectCategories() {
  const [location, setLocation] = useLocation();
  
  const getSearchParam = (key: string): string | null => {
    if (typeof window === 'undefined') return null;
    const params = new URLSearchParams(location.split('?')[1] || '');
    return params.get(key);
  };
  
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(getSearchParam("cat"));
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]);

  useEffect(() => {
    const categoryParam = getSearchParam("cat");
    setSelectedCategory(categoryParam);
  }, [location]);

  const { data: categories, isLoading: categoriesLoading } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const { data: projects, isLoading: projectsLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  const filteredProjects = projects?.filter((project) => {
    if (selectedCategory && project.category !== selectedCategory) return false;
    const price = parseFloat(project.price);
    if (price < priceRange[0] || price > priceRange[1]) return false;
    return true;
  });

  const handleCategoryFilter = (slug: string | null) => {
    setSelectedCategory(slug);
    if (slug) {
      setLocation(`/categories?cat=${slug}`);
    } else {
      setLocation("/categories");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-card border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-heading font-bold text-3xl sm:text-4xl mb-2" data-testid="text-page-title">
                Browse Projects
              </h1>
              <p className="text-muted-foreground">
                Explore our collection of {projects?.length || 0} ready-made projects
              </p>
            </div>
            <Button
              variant="outline"
              className="lg:hidden"
              onClick={() => setShowFilters(!showFilters)}
              data-testid="button-toggle-filters"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className={`lg:block ${showFilters ? 'block' : 'hidden'} space-y-6`}>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-heading font-semibold text-lg">Filters</h3>
                  {selectedCategory && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCategoryFilter(null)}
                      data-testid="button-clear-filters"
                    >
                      <X className="w-4 h-4 mr-1" />
                      Clear
                    </Button>
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-3 text-sm">Categories</h4>
                    <div className="space-y-2">
                      {categoriesLoading ? (
                        Array.from({ length: 5 }).map((_, i) => (
                          <Skeleton key={i} className="h-8 w-full" />
                        ))
                      ) : (
                        categories?.map((category) => (
                          <button
                            key={category.id}
                            onClick={() => handleCategoryFilter(category.slug)}
                            className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors hover-elevate active-elevate-2 ${
                              selectedCategory === category.slug
                                ? "bg-primary text-primary-foreground"
                                : ""
                            }`}
                            data-testid={`filter-category-${category.slug}`}
                          >
                            <div className="flex items-center justify-between">
                              <span>{category.name}</span>
                              <Badge variant="secondary" className="text-xs">
                                {projects?.filter(p => p.category === category.slug).length || 0}
                              </Badge>
                            </div>
                          </button>
                        ))
                      )}
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-semibold mb-3 text-sm">Price Range</h4>
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <div className="flex-1">
                          <label className="text-xs text-muted-foreground">Min</label>
                          <input
                            type="number"
                            value={priceRange[0]}
                            onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                            className="w-full px-3 py-2 rounded-md border bg-background text-sm"
                            data-testid="input-price-min"
                          />
                        </div>
                        <div className="flex-1">
                          <label className="text-xs text-muted-foreground">Max</label>
                          <input
                            type="number"
                            value={priceRange[1]}
                            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 50000])}
                            className="w-full px-3 py-2 rounded-md border bg-background text-sm"
                            data-testid="input-price-max"
                          />
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Showing: ₹{priceRange[0]} - ₹{priceRange[1]}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </aside>

          <div className="lg:col-span-3">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-muted-foreground" data-testid="text-results-count">
                Showing {filteredProjects?.length || 0} projects
                {selectedCategory && (
                  <Badge variant="secondary" className="ml-2">
                    {categories?.find(c => c.slug === selectedCategory)?.name}
                  </Badge>
                )}
              </p>
            </div>

            {projectsLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Card key={i} className="h-96 animate-pulse bg-muted"></Card>
                ))}
              </div>
            ) : filteredProjects && filteredProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            ) : (
              <Card className="p-12 text-center">
                <p className="text-muted-foreground mb-4">No projects found matching your filters.</p>
                <Button variant="outline" onClick={() => handleCategoryFilter(null)} data-testid="button-reset-filters">
                  Reset Filters
                </Button>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
