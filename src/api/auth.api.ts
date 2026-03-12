import apiClient from "./client";

export interface RegisterPayload {
  email: string;
  password: string;
  username: string;
  profile?: {
    firstName?: string;
    lastName?: string;
  };
}

export interface LoginPayload {
  email: string;
  password: string;
}

export const authApi = {
  register: (payload: RegisterPayload) =>
    apiClient.post("/auth/register", payload),

  login: (payload: LoginPayload) =>
    apiClient.post("/auth/login", payload),

  logout: () => apiClient.post("/auth/logout"),

  me: () => apiClient.get("/auth/me"),
};
