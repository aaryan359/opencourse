import axios from "axios";
import {
  AUTH_TOKEN_KEY,
  getStoredToken,
} from "@/redux/helper/token";
import { clearAuthStorage } from "@/redux/helper/storage";

const BASE_URL = import.meta.env.VITE_API_URL;
const IS_NGROK_URL = /ngrok-free\.(dev|app)/i.test(BASE_URL ?? "");

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

  // Prevent ngrok's browser interstitial from returning an HTML 200 response.
  if (IS_NGROK_URL) {
    config.headers["ngrok-skip-browser-warning"] = "true";
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
