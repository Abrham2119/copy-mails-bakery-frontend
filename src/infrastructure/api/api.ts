/**
 * Infrastructure — the Axios instance (the Engine).
 *
 * One configured client for the whole app. Request interceptor injects the auth
 * token on every request; response interceptor normalizes errors and clears the
 * session on 401. This is the *only* place that knows how to talk to the network
 * transport — feature services are thin, typed wrappers over `apiClient`.
 *
 * Components and hooks must NEVER import `apiClient` directly — only services do.
 */

import axios, { AxiosError } from "axios";
import { API_CONFIG } from "./config";
import { authStorage } from "@/infrastructure/storage/auth.storage";
import { useAuthStore } from "@/stores/authStore";

export const apiClient = axios.create({
  baseURL: API_CONFIG.baseURL,
  timeout: API_CONFIG.timeout,
  headers: { "Content-Type": "application/json" },
});

// Request: attach the auth token to every request.
apiClient.interceptors.request.use((config) => {
  const token = authStorage.getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Response: normalize errors and handle 401 centrally.
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().clearSession();
      // A redirect to /sign-in can be triggered here via a router ref if desired.
    }
    return Promise.reject(error);
  },
);
