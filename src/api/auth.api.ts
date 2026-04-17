import apiClient from "./client";
import type { LoginPayload, RegisterPayload, AuthResponse } from "../types";

type ApiEnvelope<T> = {
  success: boolean;
  message: string;
  data: T;
};

export const authApi = {
  register: (payload: RegisterPayload) =>
    apiClient.post<ApiEnvelope<AuthResponse>>("/auth/register", payload),

  login: (payload: LoginPayload) =>
    apiClient.post<ApiEnvelope<AuthResponse>>("/auth/login", payload),

  logout: () => apiClient.post("/auth/logout"),

  me: () => apiClient.get<ApiEnvelope<any>>("/auth/me"),
};
