"use client";

/**
 * (private)/_components — ProtectedRoute (auth gate).
 *
 * Client-side UX guard: waits for the auth store to rehydrate, then redirects
 * unauthenticated users to sign-in. This hides UI only — real security is the
 * API verifying every request.
 */

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import { PATHS } from "@/constant/paths";
import { PageSkeletonLoader } from "@/components/skeleton/PageSkeletonLoader";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isHydrating = useAuthStore((s) => s.isHydrating);

  useEffect(() => {
    if (!isHydrating && !isAuthenticated) router.replace(PATHS.auth.signIn);
  }, [isHydrating, isAuthenticated, router]);

  if (isHydrating) return <PageSkeletonLoader />;
  if (!isAuthenticated) return null;
  return <>{children}</>;
}
