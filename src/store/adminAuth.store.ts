/**
 * Admin auth store — completely separate from the user auth.store.
 * Uses localStorage keys: oc_admin_token, oc_admin_user
 * so it cannot conflict with normal user sessions.
 */
import { create } from "zustand";
import { adminApi } from "../api/admin.api";

interface AdminUser {
  _id: string;
  email: string;
  username: string;
  role: "admin";
}

interface AdminAuthState {
  admin: AdminUser | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string, adminSecret: string) => Promise<void>;
  logout: () => void;
  init: () => void;
}

export const useAdminStore = create<AdminAuthState>((set) => ({
  admin: null,
  token: null,
  loading: false,
  error: null,

  init: () => {
    try {
      const token = localStorage.getItem("oc_admin_token");
      const raw = localStorage.getItem("oc_admin_user");
      if (token && raw) {
        set({ token, admin: JSON.parse(raw) });
      }
    } catch {
      localStorage.removeItem("oc_admin_token");
      localStorage.removeItem("oc_admin_user");
    }
  },

  login: async (email, password, adminSecret) => {
    set({ loading: true, error: null });
    try {
      const res = await adminApi.login(email, password, adminSecret);
      const { token, user } = res.data.data;
      localStorage.setItem("oc_admin_token", token);
      localStorage.setItem("oc_admin_user", JSON.stringify(user));
      set({ token, admin: user, loading: false });
    } catch (err: any) {
      const msg =
        err?.response?.data?.message || "Login failed. Check your credentials.";
      set({ error: msg, loading: false });
      throw new Error(msg);
    }
  },

  logout: () => {
    localStorage.removeItem("oc_admin_token");
    localStorage.removeItem("oc_admin_user");
    set({ admin: null, token: null, error: null });
  },
}));
