import type { AdminUser, AuthUser } from '@/types';
import {   ADMIN_TOKEN_KEY, ADMIN_USER_KEY,  AUTH_TOKEN_KEY, AUTH_USER_KEY,  getStoredToken,  removeStoredToken,  setStoredToken, } from './token';


const parseJson = <T>(raw: string | null): T | null => {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
};





// Reads auth token and user from localStorage for session persistence
export const readAuthStorage = (): { token: string | null; user: AuthUser | null } => {
  return {
    token: getStoredToken(AUTH_TOKEN_KEY),
    user: parseJson<AuthUser>(localStorage.getItem(AUTH_USER_KEY)),
  };
};



// Writes auth token and user to localStorage for session persistence
export const writeAuthStorage = (token: string, user: AuthUser): void => {
  setStoredToken(AUTH_TOKEN_KEY, token);
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
};


// removes both auth and admin storage to ensure complete logout/cleanup
export const clearAuthStorage = (): void => {
  removeStoredToken(AUTH_TOKEN_KEY);
  localStorage.removeItem(AUTH_USER_KEY);
};



// Similar functions for admin session management
export const readAdminStorage = (): { token: string | null; admin: AdminUser | null } => {
  return {
    token: getStoredToken(ADMIN_TOKEN_KEY),
    admin: parseJson<AdminUser>(localStorage.getItem(ADMIN_USER_KEY)),
  };
};


// Writes admin token and user to localStorage for session persistence
export const writeAdminStorage = (token: string, admin: AdminUser): void => {
  setStoredToken(ADMIN_TOKEN_KEY, token);
  localStorage.setItem(ADMIN_USER_KEY, JSON.stringify(admin));
};

// removes both auth and admin storage to ensure complete logout/cleanup
export const clearAdminStorage = (): void => {
  removeStoredToken(ADMIN_TOKEN_KEY);
  localStorage.removeItem(ADMIN_USER_KEY);
};
