/**
 * stores — auth store (Zustand, global client state).
 *
 * Holds the authenticated user's session and *permissions* (the access model).
 * Persisted so a refresh keeps the user logged in. Guards and the `<Can>`
 * component read permission checkers (`can` / `canAll` / `canAny`) from here.
 *
 * Golden rule: never store server data (orders, products) here — that lives in
 * TanStack Query. Client-owned, cross-route state only.
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "@/domain/entities/user.types";
import type { Permission } from "@/domain/enums/permission.enum";
import { authStorage } from "@/infrastructure/storage/auth.storage";

interface AuthState {
  user: User | null;
  token: string | null;
  permissions: Permission[];
  isAuthenticated: boolean;
  /** True until persisted state finishes rehydrating; guards wait on it. */
  isHydrating: boolean;
  setSession: (payload: { user: User; token: string; permissions: Permission[] }) => void;
  clearSession: () => void;
  // Permission checkers consumed by guards and <Can>.
  can: (permission: Permission) => boolean;
  canAll: (permissions: Permission[]) => boolean;
  canAny: (permissions: Permission[]) => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      permissions: [],
      isAuthenticated: false,
      isHydrating: true,
      setSession: ({ user, token, permissions }) => {
        authStorage.setToken(token);
        set({ user, token, permissions, isAuthenticated: true });
      },
      clearSession: () => {
        authStorage.clear();
        set({ user: null, token: null, permissions: [], isAuthenticated: false });
      },
      can: (permission) => get().permissions.includes(permission),
      canAll: (permissions) => permissions.every((p) => get().permissions.includes(p)),
      canAny: (permissions) => permissions.some((p) => get().permissions.includes(p)),
    }),
    {
      name: "auth-store",
      // Flip the flag once persisted state is restored, so guards can wait.
      onRehydrateStorage: () => (state) => {
        if (state) state.isHydrating = false;
      },
    },
  ),
);
