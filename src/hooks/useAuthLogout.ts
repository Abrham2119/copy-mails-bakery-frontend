"use client";

/**
 * hooks — useAuthLogout.
 *
 * Handles logout end-to-end: calls the logout API, clears the auth store +
 * storage token, drops all cached server state (React Query), and redirects
 * home. Next.js-native redirect via the App Router.
 */

import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { authService } from "@/features/auth/api/authService";
import { useAuthStore } from "@/stores/authStore";
import { PATHS } from "@/constant/paths";

export function useAuthLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const clearSession = useAuthStore((s) => s.clearSession);

  return async () => {
    try {
      await authService.logout();
    } catch {
      /* ignore network failure — we clear locally regardless */
    }
    clearSession();
    queryClient.clear();
    router.replace(PATHS.home);
  };
}
