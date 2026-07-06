"use client";

/**
 * features/auth — <Can> (permission-gated UI).
 *
 * Conditionally renders children based on the user's permissions. Hide actions
 * the user isn't allowed to perform. Client-side gating is UX only — the API
 * must still verify permissions on every request.
 *
 *   <Can require="orders.create"><Button>New order</Button></Can>
 *   <Can require={["settings.view", "settings.manage"]} mode="any"><Settings /></Can>
 */

import type { ReactNode } from "react";
import { useAuthStore } from "@/stores/authStore";
import type { Permission } from "@/domain/enums/permission.enum";

export function Can({
  require,
  mode = "all",
  fallback = null,
  children,
}: {
  require: Permission | Permission[];
  mode?: "all" | "any";
  fallback?: ReactNode;
  children: ReactNode;
}) {
  const canAll = useAuthStore((s) => s.canAll);
  const canAny = useAuthStore((s) => s.canAny);
  const required = Array.isArray(require) ? require : [require];
  const allowed = mode === "all" ? canAll(required) : canAny(required);
  return <>{allowed ? children : fallback}</>;
}
