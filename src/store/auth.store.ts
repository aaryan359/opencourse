import { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { authApi } from "../api/auth.api";
import {
  clearAuthError,
  initializeAuth,
  loginUserThunk,
  logoutAuth,
  registerUserThunk,
} from "../redux/auth/auth.slice";
import type { AuthUser, LoginPayload, RegisterPayload } from "../types";

type AuthStoreView = {
  user: AuthUser | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  initFromStorage: () => void;
};

const identitySelector = (state: AuthStoreView) => state;

// Compatibility hook that keeps existing component usage unchanged while using Redux.
export function useAuthStore(): AuthStoreView;
export function useAuthStore<T>(selector: (state: AuthStoreView) => T): T;
export function useAuthStore<T>(selector?: (state: AuthStoreView) => T): T | AuthStoreView {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((s) => s.auth);

  const actions = useMemo(
    () => ({
      login: async (payload: LoginPayload) => {
        try {
          await dispatch(loginUserThunk(payload)).unwrap();
        } catch (error: any) {
          throw new Error(String(error || "Login failed."));
        }
      },
      register: async (payload: RegisterPayload) => {
        try {
          await dispatch(registerUserThunk(payload)).unwrap();
        } catch (error: any) {
          throw new Error(String(error || "Registration failed."));
        }
      },
      logout: () => {
        void authApi.logout().catch(() => undefined);
        dispatch(logoutAuth());
      },
      clearError: () => {
        dispatch(clearAuthError());
      },
      initFromStorage: () => {
        void dispatch(initializeAuth());
      },
    }),
    [dispatch]
  );

  const storeView = useMemo<AuthStoreView>(
    () => ({
      user: auth.user,
      token: auth.token,
      loading: auth.loading,
      error: auth.error,
      ...actions,
    }),
    [auth.user, auth.token, auth.loading, auth.error, actions]
  );

  const safeSelector = (selector ?? identitySelector) as (state: AuthStoreView) => T;
  return safeSelector(storeView);
}
