/**
 * Layout for the auth route group — app/(auth)/layout.tsx.
 * Providers are scoped here so auth pages get React Query / toaster without
 * affecting the marketing home page.
 */

import type { ReactNode } from "react";
import { AppProviders } from "@/providers/AppProviders";

export default function AuthGroupLayout({ children }: { children: ReactNode }) {
  return <AppProviders>{children}</AppProviders>;
}
