"use client";

/**
 * features/auth — useLogin mutation hook.
 *
 * Orchestrates the login use case: calls the service, persists the session
 * (user + token + permissions) to the auth store, then redirects. Next.js-native
 * navigation via the App Router.
 */

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { authService } from "../api/authService";
import { useAuthStore } from "@/stores/authStore";
import { PATHS } from "@/constant/paths";

export function useLogin() {
  const router = useRouter();
  const setSession = useAuthStore((s) => s.setSession);

  return useMutation({
    mutationFn: authService.login,
    onSuccess: ({ user, token, permissions }) => {
      setSession({ user, token, permissions });
      router.replace(PATHS.dashboard);
    },
  });
}
