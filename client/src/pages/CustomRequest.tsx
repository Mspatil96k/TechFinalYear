import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertCustomRequestSchema, type InsertCustomRequest } from "@shared/schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, Clock, MessageCircle, FileText } from "lucide-react";

export default function CustomRequest() {
  const { toast } = useToast();

  const form = useForm<InsertCustomRequest>({
    resolver: zodResolver(insertCustomRequestSchema),
    defaultValues: {
      name: "",
      email: "",
      whatsapp: "",
      branch: "",
      projectTitle: "",
      requirements: "",
      technologies: [],
      deadline: "",
      budget: "",
      additionalNotes: "",
    },
  });

  const customRequestMutation = useMutation({
    mutationFn: async (data: InsertCustomRequest) => {
      return apiRequest("POST", "/api/custom-requests", data);
    },
    onSuccess: () => {
      toast({
        title: "Request Submitted Successfully!",
        description: "Our team will contact you within 24 hours to discuss your project.",
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["/api/custom-requests"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit request. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertCustomRequest) => {
    const processedData = {
      ...data,
      technologies: data.technologies || [],
    };
    customRequestMutation.mutate(processedData);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-card border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h1 className="font-heading font-bold text-3xl sm:text-4xl mb-4" data-testid="text-page-title">
            Get Your Custom Project Built
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Share your unique project idea and our expert team will build it with complete support, documentation, and guidance
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-8">
                <h2 className="font-heading font-semibold text-2xl mb-6">Project Details</h2>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Your Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your full name" {...field} data-testid="input-name" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="your.email@example.com" {...field} data-testid="input-email" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="whatsapp"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>WhatsApp Number *</FormLabel>
                            <FormControl>
                              <Input placeholder="+91 7028945423" {...field} data-testid="input-whatsapp" />
                            </FormControl>
                            <FormDescription>We'll contact you here</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="branch"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Branch/Stream *</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., Computer Science" {...field} data-testid="input-branch" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="projectTitle"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Project Title</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your project title (if you have one)" {...field} data-testid="input-title" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="requirements"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Detailed Requirements *</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Describe your project idea, features you need, and any specific requirements..."
                              className="resize-none min-h-32"
                              {...field}
                              data-testid="input-requirements"
                            />
                          </FormControl>
                          <FormDescription>Please be as detailed as possible (minimum 20 characters)</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="technologies"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Preferred Technologies</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g., Python, React, MongoDB (comma-separated)"
                              {...field}
                              value={Array.isArray(field.value) ? field.value.join(", ") : ""}
                              onChange={(e) => {
                                const techs = e.target.value.split(",").map(t => t.trim()).filter(Boolean);
                                field.onChange(techs);
                              }}
                              data-testid="input-technologies"
                            />
                          </FormControl>
                          <FormDescription>Optional - our team can suggest suitable technologies</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="deadline"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Expected Deadline</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} data-testid="input-deadline" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="budget"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Budget Range</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., ₹5000 - ₹10000" {...field} data-testid="input-budget" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="additionalNotes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Additional Notes</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Any other information you'd like to share..."
                              className="resize-none"
                              rows={3}
                              {...field}
                              data-testid="input-notes"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" size="lg" className="w-full" disabled={customRequestMutation.isPending} data-testid="button-submit">
                      {customRequestMutation.isPending ? "Submitting..." : "Submit Custom Request"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-heading font-semibold text-lg mb-4">What Happens Next?</h3>
                <div className="space-y-4">
                  {[
                    { step: 1, icon: MessageCircle, title: "We Contact You", desc: "Within 24 hours on WhatsApp" },
                    { step: 2, icon: FileText, title: "Discuss Details", desc: "Finalize requirements & pricing" },
                    { step: 3, icon: CheckCircle, title: "Development Starts", desc: "Our team begins building" },
                    { step: 4, icon: Clock, title: "Timely Delivery", desc: "Get project before deadline" },
                  ].map((item) => (
                    <div key={item.step} className="flex gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold">{item.title}</p>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-heading font-semibold text-lg mb-3">Average Response Time</h3>
                <div className="flex items-center gap-2 text-2xl font-bold text-primary mb-4">
                  <Clock className="w-6 h-6" />
                  <span>2-4 Hours</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  We typically respond to custom project requests within a few hours during business hours.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-heading font-semibold text-lg mb-3">Need Help?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Chat with us directly on WhatsApp for immediate assistance
                </p>
                <Button asChild variant="outline" className="w-full" data-testid="button-whatsapp">
                  <a href="https://wa.me/7028945423" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Chat on WhatsApp
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
