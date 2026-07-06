/**
 * Layout for the protected route group — app/(private)/layout.tsx.
 *
 * Mounts the app infrastructure (AppProviders: React Query + theme + i18n +
 * toaster) and the private chrome (LayoutShell → ProtectedRoute) around every
 * page in this group. Scoping providers here (rather than the root layout)
 * keeps the marketing home page's render tree untouched.
 */

import type { ReactNode } from "react";
import { AppProviders } from "@/providers/AppProviders";
import { LayoutShell } from "./_components/LayoutShell";

export default function PrivateLayout({ children }: { children: ReactNode }) {
  return (
    <AppProviders>
      <LayoutShell>{children}</LayoutShell>
    </AppProviders>
  );
}
