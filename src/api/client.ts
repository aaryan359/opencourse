import axios from "axios";
import {
  AUTH_TOKEN_KEY,
  getStoredToken,
} from "@/redux/helper/token";
import { clearAuthStorage } from "@/redux/helper/storage";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api/v1";

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});

// Attach token on every request
apiClient.interceptors.request.use((config) => {
  const token = getStoredToken(AUTH_TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 globally – clear token
apiClient.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      clearAuthStorage();
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("auth:unauthorized"));
      }
    }
    return Promise.reject(err);
  }
);

export default apiClient;
