"use client";

/**
 * providers — AppProviders.
 *
 * Centralizes every global context provider in one place (React Query, theme,
 * i18n) plus the Sonner toaster. Mount this once around the subtree that needs
 * the app infrastructure.
 *
 * NOTE: In this project it is wired into the `app/(private)` route group's
 * layout rather than the root layout, so the marketing home page render tree
 * stays exactly as it was (the theme/styling requirement). In a greenfield app
 * you would mount it at the root `app/layout.tsx` via `app/providers.tsx`.
 */

import type { ReactNode } from "react";
import { Toaster } from "sonner";
import { QueryProvider } from "./QueryProvider";
import { ThemeProvider } from "./ThemeProvider";
import { I18nProvider } from "./I18nProvider";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <QueryProvider>
      <ThemeProvider>
        <I18nProvider>
          {children}
          <Toaster position="top-right" richColors />
        </I18nProvider>
      </ThemeProvider>
    </QueryProvider>
  );
}
