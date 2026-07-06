/**
 * Layout for the public example route group — app/(public)/layout.tsx.
 *
 * Wraps public example pages (e.g. /reviews) that need client data-fetching with
 * AppProviders. The marketing home page lives at the root (app/page.tsx), OUTSIDE
 * this group, so it is unaffected.
 */

import type { ReactNode } from "react";
import { AppProviders } from "@/providers/AppProviders";

export default function PublicGroupLayout({ children }: { children: ReactNode }) {
  return <AppProviders>{children}</AppProviders>;
}
