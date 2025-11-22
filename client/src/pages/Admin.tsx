import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { getQueryFn } from "@/lib/queryClient";
import type { CustomRequest, Inquiry } from "@shared/schema";
import { 
  MessageCircle, 
  Mail, 
  Phone, 
  Calendar, 
  DollarSign, 
  FileText,
  RefreshCw,
  User,
  GraduationCap,
  Lock
} from "lucide-react";

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Admin password - Change this to your secure password
  // In production, use environment variable: import.meta.env.VITE_ADMIN_PASSWORD
  const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || "Ms962365@";

  useEffect(() => {
    // Check if already authenticated (stored in sessionStorage)
    try {
      const authStatus = sessionStorage.getItem("admin_authenticated");
      if (authStatus === "true") {
        setIsAuthenticated(true);
      }
    } catch (e) {
      console.error("Error accessing sessionStorage:", e);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem("admin_authenticated", "true");
      setError("");
    } else {
      setError("Incorrect password. Please try again.");
      setPassword("");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("admin_authenticated");
    setPassword("");
  };

  const { data: customRequests, isLoading: requestsLoading, refetch: refetchRequests } = useQuery<CustomRequest[]>({
    queryKey: ["/api/custom-requests"],
    queryFn: getQueryFn({ on401: "returnNull" }),
    enabled: isAuthenticated,
  });

  const { data: inquiries, isLoading: inquiriesLoading, refetch: refetchInquiries } = useQuery<Inquiry[]>({
    queryKey: ["/api/inquiries"],
    queryFn: getQueryFn({ on401: "returnNull" }),
    enabled: isAuthenticated,
  });

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return "Not specified";
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20";
      case "in_progress":
        return "bg-blue-500/10 text-blue-600 border-blue-500/20";
      case "completed":
        return "bg-green-500/10 text-green-600 border-green-500/20";
      case "rejected":
        return "bg-red-500/10 text-red-600 border-red-500/20";
      default:
        return "bg-gray-500/10 text-gray-600 border-gray-500/20";
    }
  };

  // Login form if not authenticated
  if (!isAuthenticated) {
    return (
      <div 
        className="min-h-screen bg-background flex items-center justify-center px-4" 
        style={{ 
          backgroundColor: '#ffffff', 
          minHeight: '100vh',
          padding: '20px'
        }}
      >
        <Card 
          className="w-full max-w-md" 
          style={{ 
            backgroundColor: '#ffffff', 
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}
        >
          <CardHeader>
            <div className="flex items-center justify-center mb-4">
              <div 
                className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: '#f3f4f6', borderRadius: '50%' }}
              >
                <Lock className="w-8 h-8 text-primary" style={{ color: '#3b82f6' }} />
              </div>
            </div>
            <CardTitle className="text-center text-2xl" style={{ color: '#111827', fontSize: '24px', fontWeight: '600' }}>
              Admin Login
            </CardTitle>
            <p className="text-center text-muted-foreground text-sm mt-2" style={{ color: '#6b7280', marginTop: '8px' }}>
              Enter password to access admin dashboard
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Input
                  type="password"
                  placeholder="Enter admin password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full"
                  autoFocus
                  style={{ 
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '4px'
                  }}
                />
                {error && (
                  <p className="text-sm text-destructive mt-2" style={{ color: '#ef4444', marginTop: '8px' }}>
                    {error}
                  </p>
                )}
              </div>
              <Button 
                type="submit" 
                className="w-full" 
                size="lg"
                style={{
                  width: '100%',
                  padding: '10px',
                  backgroundColor: '#3b82f6',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Login
              </Button>
            </form>
            <p className="text-xs text-muted-foreground text-center mt-4" style={{ color: '#6b7280', marginTop: '16px', fontSize: '12px' }}>
              Default password: admin123 (Change this in production!)
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Admin dashboard
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="font-heading font-bold text-3xl sm:text-4xl mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">View and manage custom project requests and inquiries</p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Custom Requests
                </CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => refetchRequests()}
                  disabled={requestsLoading}
                >
                  <RefreshCw className={`w-4 h-4 mr-2 ${requestsLoading ? "animate-spin" : ""}`} />
                  Refresh
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                {customRequests?.length || 0} total requests
              </p>
            </CardHeader>
            <CardContent>
              {requestsLoading ? (
                <div className="text-center py-8 text-muted-foreground">Loading requests...</div>
              ) : !customRequests || customRequests.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No custom requests yet
                </div>
              ) : (
                <div className="space-y-4 max-h-[600px] overflow-y-auto">
                  {customRequests.map((request) => (
                    <Card key={request.id} className="border">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-semibold text-lg flex items-center gap-2">
                              <User className="w-4 h-4" />
                              {request.name}
                            </h3>
                            {request.projectTitle && (
                              <p className="text-sm text-muted-foreground mt-1">
                                Project: {request.projectTitle}
                              </p>
                            )}
                          </div>
                          <Badge className={getStatusColor(request.status || "pending")}>
                            {request.status || "pending"}
                          </Badge>
                        </div>

                        <Separator className="my-3" />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                          <div className="flex items-center gap-2">
                            <GraduationCap className="w-4 h-4 text-muted-foreground" />
                            <span className="font-medium">Branch:</span>
                            <span>{request.branch}</span>
                          </div>

                          {request.email && (
                            <div className="flex items-center gap-2">
                              <Mail className="w-4 h-4 text-muted-foreground" />
                              <span className="font-medium">Email:</span>
                              <a
                                href={`mailto:${request.email}`}
                                className="text-primary hover:underline"
                              >
                                {request.email}
                              </a>
                            </div>
                          )}

                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-muted-foreground" />
                            <span className="font-medium">WhatsApp:</span>
                            <a
                              href={`https://wa.me/${request.whatsapp.replace(/\D/g, "")}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:underline"
                            >
                              {request.whatsapp}
                            </a>
                          </div>

                          {request.deadline && (
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-muted-foreground" />
                              <span className="font-medium">Deadline:</span>
                              <span>{formatDate(request.deadline)}</span>
                            </div>
                          )}

                          {request.budget && (
                            <div className="flex items-center gap-2">
                              <DollarSign className="w-4 h-4 text-muted-foreground" />
                              <span className="font-medium">Budget:</span>
                              <span>₹{request.budget}</span>
                            </div>
                          )}
                        </div>

                        {request.technologies && request.technologies.length > 0 && (
                          <div className="mt-3">
                            <span className="text-sm font-medium">Technologies: </span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {request.technologies.map((tech, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs">
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="mt-4">
                          <p className="text-sm font-medium mb-1">Requirements:</p>
                          <p className="text-sm text-muted-foreground bg-muted p-3 rounded-md">
                            {request.requirements}
                          </p>
                        </div>

                        {request.additionalNotes && (
                          <div className="mt-3">
                            <p className="text-sm font-medium mb-1">Additional Notes:</p>
                            <p className="text-sm text-muted-foreground bg-muted p-3 rounded-md">
                              {request.additionalNotes}
                            </p>
                          </div>
                        )}

                        <div className="mt-4 flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            asChild
                            className="flex-1"
                          >
                            <a
                              href={`https://wa.me/${request.whatsapp.replace(/\D/g, "")}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <MessageCircle className="w-4 h-4 mr-2" />
                              Contact on WhatsApp
                            </a>
                          </Button>
                          {request.email && (
                            <Button
                              size="sm"
                              variant="outline"
                              asChild
                              className="flex-1"
                            >
                              <a href={`mailto:${request.email}`}>
                                <Mail className="w-4 h-4 mr-2" />
                                Send Email
                              </a>
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Inquiries
                </CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => refetchInquiries()}
                  disabled={inquiriesLoading}
                >
                  <RefreshCw className={`w-4 h-4 mr-2 ${inquiriesLoading ? "animate-spin" : ""}`} />
                  Refresh
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                {inquiries?.length || 0} total inquiries
              </p>
            </CardHeader>
            <CardContent>
              {inquiriesLoading ? (
                <div className="text-center py-8 text-muted-foreground">Loading inquiries...</div>
              ) : !inquiries || inquiries.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No inquiries yet
                </div>
              ) : (
                <div className="space-y-4 max-h-[600px] overflow-y-auto">
                  {inquiries.map((inquiry) => (
                    <Card key={inquiry.id} className="border">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-semibold text-lg flex items-center gap-2">
                              <User className="w-4 h-4" />
                              {inquiry.name}
                            </h3>
                          </div>
                        </div>

                        <Separator className="my-3" />

                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <GraduationCap className="w-4 h-4 text-muted-foreground" />
                            <span className="font-medium">Branch:</span>
                            <span>{inquiry.branch}</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-muted-foreground" />
                            <span className="font-medium">WhatsApp:</span>
                            <a
                              href={`https://wa.me/${inquiry.whatsapp.replace(/\D/g, "")}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:underline"
                            >
                              {inquiry.whatsapp}
                            </a>
                          </div>
                        </div>

                        <div className="mt-4">
                          <p className="text-sm font-medium mb-1">Requirement:</p>
                          <p className="text-sm text-muted-foreground bg-muted p-3 rounded-md">
                            {inquiry.requirement}
                          </p>
                        </div>

                        <div className="mt-4">
                          <Button
                            size="sm"
                            variant="outline"
                            asChild
                            className="w-full"
                          >
                            <a
                              href={`https://wa.me/${inquiry.whatsapp.replace(/\D/g, "")}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <MessageCircle className="w-4 h-4 mr-2" />
                              Contact on WhatsApp
                            </a>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Button
                variant="outline"
                onClick={() => {
                  refetchRequests();
                  refetchInquiries();
                }}
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh All
              </Button>
              <Button variant="outline" asChild>
                <a href="/api/custom-requests" target="_blank">
                  <FileText className="w-4 h-4 mr-2" />
                  Export Requests (JSON)
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href="/api/inquiries" target="_blank">
                  <FileText className="w-4 h-4 mr-2" />
                  Export Inquiries (JSON)
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
