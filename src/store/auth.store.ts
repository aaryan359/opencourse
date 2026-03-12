import { create } from "zustand";
import { authApi, type LoginPayload, type RegisterPayload } from "../api/auth.api";

export interface AuthUser {
  _id: string;
  email: string;
  username: string;
  role: "student" | "instructor" | "admin" | "super_admin";
  profile: {
    firstName?: string;
    lastName?: string;
    avatar?: string;
    bio?: string;
    title?: string;
  };
}

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  loading: boolean;
  error: string | null;

  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  initFromStorage: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  loading: false,
  error: null,

  initFromStorage: () => {
    const token = localStorage.getItem("oc_token");
    const raw = localStorage.getItem("oc_user");
    if (token && raw) {
      try {
        const user = JSON.parse(raw);
        set({ token, user });
      } catch {
        localStorage.removeItem("oc_token");
        localStorage.removeItem("oc_user");
      }
    }
  },

  login: async (payload) => {
    set({ loading: true, error: null });
    try {
      const res = await authApi.login(payload);
      const { token, user } = res.data.data;
      localStorage.setItem("oc_token", token);
      localStorage.setItem("oc_user", JSON.stringify(user));
      set({ token, user, loading: false });
    } catch (err: any) {
      const msg =
        err.response?.data?.message || "Login failed. Please try again.";
      set({ error: msg, loading: false });
      throw new Error(msg);
    }
  },

  register: async (payload) => {
    set({ loading: true, error: null });
    try {
      const res = await authApi.register(payload);
      const { token, user } = res.data.data;
      localStorage.setItem("oc_token", token);
      localStorage.setItem("oc_user", JSON.stringify(user));
      set({ token, user, loading: false });
    } catch (err: any) {
      const msg =
        err.response?.data?.message || "Registration failed. Please try again.";
      set({ error: msg, loading: false });
      throw new Error(msg);
    }
  },

  logout: () => {
    localStorage.removeItem("oc_token");
    localStorage.removeItem("oc_user");
    set({ user: null, token: null });
  },

  clearError: () => set({ error: null }),
}));
