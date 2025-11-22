import { API_CONFIG } from '@/config/api';

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface RequestOptions extends RequestInit {
  params?: Record<string, string | number | boolean>;
  data?: unknown;
}

export class ApiError extends Error {
  status: number;
  data: unknown;

  constructor(message: string, status: number, data: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

export async function api<T = unknown>(
  endpoint: string,
  { method = 'GET', params, data, ...customConfig }: RequestOptions = {}
): Promise<T> {
  const config: RequestInit = {
    method,
    headers: {
      ...API_CONFIG.HEADERS,
      ...(customConfig.headers || {}),
    },
    ...customConfig,
  };

  // Handle request body
  if (data) {
    config.body = JSON.stringify(data);
  }

  // Build URL with query parameters
  const url = new URL(`${API_CONFIG.BASE_URL}${endpoint}`);
  
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });
  }

  // Add timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);

  try {
    const response = await fetch(url.toString(), {
      ...config,
      signal: controller.signal,
      credentials: 'include', // Important for cookies, authentication
    });

    clearTimeout(timeoutId);

    const responseData = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new ApiError(
        responseData.message || 'Something went wrong',
        response.status,
        responseData
      );
    }

    return responseData as T;
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new Error('Request timed out');
      }
      throw error;
    }
    throw new Error('An unknown error occurred');
  }
}

// Helper methods for common HTTP methods
export const apiClient = {
  get: <T = unknown>(endpoint: string, options?: Omit<RequestOptions, 'method' | 'data'>) =>
    api<T>(endpoint, { ...options, method: 'GET' }),
  
  post: <T = unknown>(endpoint: string, data?: unknown, options?: Omit<RequestOptions, 'method' | 'data'>) =>
    api<T>(endpoint, { ...options, method: 'POST', data }),
  
  put: <T = unknown>(endpoint: string, data?: unknown, options?: Omit<RequestOptions, 'method' | 'data'>) =>
    api<T>(endpoint, { ...options, method: 'PUT', data }),
  
  delete: <T = unknown>(endpoint: string, options?: Omit<RequestOptions, 'method'>) =>
    api<T>(endpoint, { ...options, method: 'DELETE' }),
  
  patch: <T = unknown>(endpoint: string, data?: unknown, options?: Omit<RequestOptions, 'method' | 'data'>) =>
    api<T>(endpoint, { ...options, method: 'PATCH', data }),
};
