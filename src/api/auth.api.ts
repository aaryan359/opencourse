import apiClient from "./client";
import type { LoginPayload, RegisterPayload, AuthResponse, ApiEnvelope, AuthUser } from "../types";

export const authApi = {
  register: (payload: RegisterPayload) =>
    apiClient.post<ApiEnvelope<AuthResponse>>("/auth/register", payload),

  login: (payload: LoginPayload) =>
    apiClient.post<ApiEnvelope<AuthResponse>>("/auth/login", payload),

  logout: () => apiClient.post("/auth/logout"),

  me: () => apiClient.get<ApiEnvelope<AuthUser>>("/auth/me"),
};
