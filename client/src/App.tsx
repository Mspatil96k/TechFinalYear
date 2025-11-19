import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import Home from "@/pages/Home";
import ProjectCategories from "@/pages/ProjectCategories";
import ProjectDetail from "@/pages/ProjectDetail";
import CustomRequest from "@/pages/CustomRequest";
import AboutUs from "@/pages/AboutUs";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/categories" component={ProjectCategories} />
      <Route path="/project/:id" component={ProjectDetail} />
      <Route path="/custom-request" component={CustomRequest} />
      <Route path="/about" component={AboutUs} />
      <Route path="/contact" component={Contact} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="flex flex-col min-h-screen">
          <Navigation />
          <main className="flex-1">
            <Router />
          </main>
          <Footer />
          <FloatingWhatsApp />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
