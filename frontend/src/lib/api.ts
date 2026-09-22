const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

export interface HealthResponse {
  status: string;
  timestamp: string;
}

/**
 * Calls the backend health check endpoint (GET /up).
 * Demonstrates how the frontend talks to the Rails API.
 */
export async function fetchHealth(): Promise<HealthResponse> {
  const response = await fetch(`${API_URL}/up`);

  if (!response.ok) {
    throw new Error(`Health check failed with status ${response.status}`);
  }

  return {
    status: response.ok ? "ok" : "error",
    timestamp: new Date().toISOString(),
  };
}
