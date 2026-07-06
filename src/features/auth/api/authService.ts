/**
 * features/auth — auth service (Application layer transport).
 *
 * Thin, typed wrapper over the shared apiClient. Returns *domain types*, never
 * raw Axios responses. Components/hooks never call apiClient directly — only
 * services do.
 */

import { apiClient } from "@/infrastructure/api/api";
import { API_ENDPOINTS } from "@/infrastructure/api/endpoints";
import type { User } from "@/domain/entities/user.types";
import type { Permission } from "@/domain/enums/permission.enum";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthResult {
  user: User;
  token: string;
  permissions: Permission[];
}

export const authService = {
  login: async (payload: LoginPayload): Promise<AuthResult> => {
    const { data } = await apiClient.post<{ data: AuthResult }>(API_ENDPOINTS.auth.login, payload);
    return data.data;
  },
  /** Re-fetch profile + permissions (e.g. on app load to refresh grants). */
  me: async (): Promise<AuthResult> => {
    const { data } = await apiClient.get<{ data: AuthResult }>(API_ENDPOINTS.auth.me);
    return data.data;
  },
  logout: async (): Promise<void> => {
    await apiClient.post(API_ENDPOINTS.auth.logout);
  },
};
