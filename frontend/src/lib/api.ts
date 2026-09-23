const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

export interface HealthResponse {
  status: string;
  timestamp: string;
}

export interface AuthUser {
  id: number;
  email: string;
}

export interface LoginResult {
  user: AuthUser;
  token: string;
}

export class InvalidCredentialsError extends Error {
  constructor() {
    super("Email ou mot de passe incorrect.");
    this.name = "InvalidCredentialsError";
  }
}

/**
 * Calls the backend login endpoint (POST /login, provided by Devise +
 * devise-jwt — see backend/app/controllers/users/sessions_controller.rb).
 * On success, the JWT is returned in the Authorization response header.
 */
export async function loginUser(
  email: string,
  password: string,
): Promise<LoginResult> {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user: { email, password } }),
  });

  if (response.status === 401) {
    throw new InvalidCredentialsError();
  }

  if (!response.ok) {
    throw new Error(`Login failed with status ${response.status}`);
  }

  const token = response.headers.get("Authorization");
  if (!token) {
    throw new Error("Login succeeded but no token was returned.");
  }

  const body = (await response.json()) as { user: AuthUser };
  return { user: body.user, token };
}

/**
 * Calls the backend logout endpoint (DELETE /logout), revoking the JWT
 * server-side (see Devise::JWT::RevocationStrategies::JTIMatcher on User).
 */
export async function logoutUser(token: string): Promise<void> {
  await fetch(`${API_URL}/logout`, {
    method: "DELETE",
    headers: { Authorization: token },
  });
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
