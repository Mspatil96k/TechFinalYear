import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MessageCircle, Mail, Phone, Clock, MapPin } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertInquirySchema, type InsertInquiry } from "@shared/schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";

export default function Contact() {
  const { toast } = useToast();

  const form = useForm<InsertInquiry>({
    resolver: zodResolver(insertInquirySchema.extend({
      whatsapp: insertInquirySchema.shape.whatsapp.refine(
        (val) => val.length >= 10,
        { message: "Please enter a valid 10-digit WhatsApp number" }
      ),
    })),
    defaultValues: {
      name: "",
      branch: "",
      whatsapp: "",
      requirement: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: InsertInquiry) => {
      return apiRequest("POST", "/api/inquiries", data);
    },
    onSuccess: () => {
      toast({
        title: "Message Sent!",
        description: "We'll get back to you within 24 hours.",
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["/api/inquiries"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertInquiry) => {
    contactMutation.mutate(data);
  };

  const faqs = [
    {
      question: "How long does it take to deliver a project?",
      answer: "Delivery time varies based on project complexity. Ready-made projects are delivered within 24-48 hours. Custom projects typically take 7-15 days depending on requirements.",
    },
    {
      question: "What if I need changes after delivery?",
      answer: "We offer free revisions and modifications for 30 days after delivery. Our team is available 24/7 to help you with any changes or clarifications you need.",
    },
    {
      question: "Do you provide support during presentation?",
      answer: "Absolutely! We provide complete support including project explanation, preparation for viva questions, and are available on call during your presentation if needed.",
    },
    {
      question: "Are the projects plagiarism-free?",
      answer: "Yes, all our projects are 100% original and unique. We develop each project from scratch and ensure they meet academic integrity standards.",
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept payments through UPI, bank transfer, Razorpay, and all major credit/debit cards. We also offer installment options for custom projects.",
    },
    {
      question: "Can I see a demo before purchasing?",
      answer: "Yes! Each project has a sample PPT or demo available for download. You can also request a video demo or live demonstration on WhatsApp.",
    },
    {
      question: "What if the project doesn't work?",
      answer: "We provide a 100% money-back guarantee if the project doesn't work as described. We also offer complete technical support to ensure successful setup and execution.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-card border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h1 className="font-heading font-bold text-3xl sm:text-4xl mb-4" data-testid="text-page-title">
            Contact Us
          </h1>
          <p className="text-lg text-muted-foreground">
            Get in touch with us for any queries or support
          </p>
        </div>
      </div>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="hover-elevate active-elevate-2 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-[#25D366]/10 flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-8 h-8 text-[#25D366]" />
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2">WhatsApp</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Fastest way to reach us
                </p>
                <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="w-full" data-testid="button-whatsapp">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Chat Now
                  </Button>
                </a>
                <p className="text-sm font-semibold mt-3">+91 98765 43210</p>
              </CardContent>
            </Card>

            <Card className="hover-elevate active-elevate-2 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2">Email</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  24-48 hour response time
                </p>
                <a href="mailto:support@techfinalyear.com">
                  <Button variant="outline" className="w-full" data-testid="button-email">
                    <Mail className="w-4 h-4 mr-2" />
                    Send Email
                  </Button>
                </a>
                <p className="text-sm font-semibold mt-3">support@techfinalyear.com</p>
              </CardContent>
            </Card>

            <Card className="hover-elevate active-elevate-2 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2">Phone</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Mon-Sat, 9 AM - 8 PM IST
                </p>
                <a href="tel:+919876543210">
                  <Button variant="outline" className="w-full" data-testid="button-phone">
                    <Phone className="w-4 h-4 mr-2" />
                    Call Now
                  </Button>
                </a>
                <p className="text-sm font-semibold mt-3">+91 98765 43210</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="font-heading font-bold text-2xl mb-6">Send us a Message</h2>
              <Card>
                <CardContent className="p-6">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Your name" {...field} data-testid="input-contact-name" />
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
                            <FormLabel>Branch *</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., Computer Science" {...field} data-testid="input-contact-branch" />
                            </FormControl>
                            <FormDescription>Your engineering branch or stream</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="whatsapp"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>WhatsApp Number *</FormLabel>
                            <FormControl>
                              <Input placeholder="+91 98765 43210" {...field} data-testid="input-contact-whatsapp" />
                            </FormControl>
                            <FormDescription>10-digit number for quick responses</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="requirement"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Message *</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Your message..."
                                className="resize-none min-h-32"
                                {...field}
                                data-testid="input-contact-message"
                              />
                            </FormControl>
                            <FormDescription>Please provide at least 10 characters</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit" className="w-full" disabled={contactMutation.isPending} data-testid="button-submit-contact">
                        {contactMutation.isPending ? "Sending..." : "Send Message"}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <Clock className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <h3 className="font-semibold mb-1">Business Hours</h3>
                      <p className="text-sm text-muted-foreground">Monday - Saturday: 9:00 AM - 8:00 PM IST</p>
                      <p className="text-sm text-muted-foreground">Sunday: 10:00 AM - 6:00 PM IST</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <h3 className="font-semibold mb-1">Location</h3>
                      <p className="text-sm text-muted-foreground">Bangalore, Karnataka, India</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <h2 className="font-heading font-bold text-2xl mb-6">Frequently Asked Questions</h2>
              <Accordion type="single" collapsible className="space-y-3">
                {faqs.map((faq, idx) => (
                  <AccordionItem key={idx} value={`item-${idx}`} className="border rounded-lg px-6">
                    <AccordionTrigger className="text-left hover:no-underline" data-testid={`faq-question-${idx}`}>
                      <span className="font-semibold">{faq.question}</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground" data-testid={`faq-answer-${idx}`}>
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              <Card className="mt-6 bg-primary text-primary-foreground">
                <CardContent className="p-6">
                  <h3 className="font-heading font-semibold text-lg mb-2">Still have questions?</h3>
                  <p className="text-sm mb-4 opacity-90">
                    Can't find the answer you're looking for? Contact us directly on WhatsApp for instant support.
                  </p>
                  <Button asChild variant="secondary" className="w-full" data-testid="button-faq-whatsapp">
                    <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Chat on WhatsApp
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
