import { QueryClient, QueryFunction } from "@tanstack/react-query";

// Get API base URL from environment variable (for production deployment)
// If not provided, fallback to your Railway backend URL
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://techfinalyear-production.up.railway.app";
// Log API base URL in development (helpful for debugging)
if (import.meta.env.DEV) {
  console.log("🔗 API Base URL:", API_BASE_URL || "(using relative URLs - local development)");
  console.log("📦 Full Vite env:", import.meta.env);
}

// Helper to build full URL - handles both relative and absolute URLs
function buildUrl(url: string): string {
  // If URL is already absolute (starts with http:// or https://), use it as-is
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  // Otherwise, prepend API_BASE_URL for production, or use relative for development
  return API_BASE_URL ? `${API_BASE_URL}${url}` : url;
}

// Helper to convert image URLs to absolute URLs (for img src attributes)
// Images are served from Railway backend, so we need to prepend API_BASE_URL
export function getImageUrl(imagePath: string | null | undefined): string {
  if (!imagePath) return "";
  // If already absolute, return as-is
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }
  // If starts with /assets, it's from Railway backend - prepend API_BASE_URL
  if (imagePath.startsWith("/assets")) {
    return API_BASE_URL ? `${API_BASE_URL}${imagePath}` : imagePath;
  }
  // Otherwise return as-is (might be a data URL or other format)
  return imagePath;
}

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  const targetUrl = buildUrl(url);
  
  // Log API request in development and production (for debugging)
  console.log(`[API Request] ${method} ${targetUrl}`, data ? { data } : '');
  
  try {
    const res = await fetch(targetUrl, {
      method,
      headers: data ? { "Content-Type": "application/json" } : {},
      body: data ? JSON.stringify(data) : undefined,
      credentials: "include",
    });

    console.log(`[API Response] ${method} ${targetUrl} - Status: ${res.status}`);
    
    await throwIfResNotOk(res);
    return res;
  } catch (error) {
    console.error(`[API Error] ${method} ${targetUrl}:`, error);
    throw error;
  }
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    const url = queryKey.join("/") as string;
    const targetUrl = buildUrl(url);
    const res = await fetch(targetUrl, {
      credentials: "include",
    });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
