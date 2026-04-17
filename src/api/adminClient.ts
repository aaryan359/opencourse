import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api/v1";

// Separate client for admin — stores token in a different localStorage key
// so it cannot interfere with the normal user session at all.
const adminClient = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});

adminClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("oc_admin_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

adminClient.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("oc_admin_token");
      localStorage.removeItem("oc_admin_user");
      window.dispatchEvent(new Event("admin:unauthorized"));
    }
    return Promise.reject(err);
  }
);

export default adminClient;
