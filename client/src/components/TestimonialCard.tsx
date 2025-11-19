import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import type { Testimonial } from "@shared/schema";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <Card className="h-full" data-testid={`card-testimonial-${testimonial.id}`}>
      <CardContent className="p-6">
        <div className="flex gap-1 mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${i < testimonial.rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted'}`}
            />
          ))}
        </div>
        <p className="text-sm mb-6 italic text-muted-foreground">
          "{testimonial.quote}"
        </p>
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={testimonial.avatarUrl || undefined} />
            <AvatarFallback className="bg-primary text-primary-foreground">
              {testimonial.studentName.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="font-semibold text-sm" data-testid={`text-student-${testimonial.id}`}>
              {testimonial.studentName}
            </p>
            <p className="text-xs text-muted-foreground">{testimonial.college}</p>
            <Badge variant="outline" className="text-xs mt-1">
              {testimonial.projectCategory}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
