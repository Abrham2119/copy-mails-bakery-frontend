"use client";

/**
 * hooks — useUrlState.
 *
 * Read/update URL search params for bookmarkable state. In Next.js the URL is
 * read via `useSearchParams()` and written via the router (the App Router
 * equivalent of react-router's `useSearchParams` write side).
 */

import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function useUrlState() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const get = useCallback(
    (key: string): string | undefined => searchParams.get(key) ?? undefined,
    [searchParams],
  );

  const set = useCallback(
    (updates: Record<string, string | number | undefined>) => {
      const next = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, value]) => {
        if (value === undefined || value === "") next.delete(key);
        else next.set(key, String(value));
      });
      const qs = next.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname);
    },
    [router, pathname, searchParams],
  );

  return { get, set };
}
