"use client";

/**
 * (private)/_components — LayoutShell.
 *
 * Sidebar + header chrome for the protected area, wrapped in ProtectedRoute.
 * Route-specific layout component (not a globally-shared design-system piece).
 */

import type { ReactNode } from "react";
import Link from "next/link";
import { LogOut } from "lucide-react";
import { ProtectedRoute } from "./ProtectedRoute";
import { Button } from "@/components/ui/Button";
import { useAuthLogout } from "@/hooks/useAuthLogout";
import { PATHS } from "@/constant/paths";

const NAV = [
  { href: PATHS.dashboard, label: "Dashboard" },
  { href: PATHS.orders, label: "Orders" },
  { href: PATHS.products, label: "Products" },
  { href: PATHS.settings, label: "Settings" },
];

export function LayoutShell({ children }: { children: ReactNode }) {
  const logout = useAuthLogout();

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen">
        <aside className="hidden w-56 shrink-0 border-r border-line p-4 md:block">
          <p className="mb-4 font-heading text-lg text-brand">Mali Beakery</p>
          <nav className="flex flex-col gap-1 text-sm">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-2 hover:bg-accent/40"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>
        <div className="flex flex-1 flex-col">
          <header className="flex items-center justify-between border-b border-line px-6 py-3">
            <span className="text-sm text-ink/60">Account area</span>
            <Button variant="ghost" size="sm" onClick={logout}>
              <LogOut className="mr-1 h-4 w-4" /> Sign out
            </Button>
          </header>
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
