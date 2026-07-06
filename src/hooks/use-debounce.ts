"use client";

/**
 * hooks — useDebounce.
 *
 * Delays updating a value until `delay`ms after the last change. Useful for
 * search inputs / API calls to prevent excessive requests.
 */

import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay = 400): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}
