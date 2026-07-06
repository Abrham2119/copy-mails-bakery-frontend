"use client";

/**
 * hooks — useMobile.
 *
 * True when the viewport is mobile-sized (< 768px). Thin wrapper over
 * useMediaQuery for mobile-specific UI tweaks.
 */

import { useMediaQuery } from "./use-media-query";

export function useMobile(): boolean {
  return useMediaQuery("(max-width: 767px)");
}
