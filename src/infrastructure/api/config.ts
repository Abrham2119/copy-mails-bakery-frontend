/**
 * Infrastructure — API configuration.
 *
 * Centralizes base URL and timeout. In Next.js, client-exposed env vars are
 * prefixed `NEXT_PUBLIC_*` (the Vite equivalent would be `import.meta.env.VITE_*`).
 * Set `NEXT_PUBLIC_API_BASE_URL` in `.env.local` (see `.env.example`).
 */

export const API_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000/v1",
  timeout: 30_000,
} as const;
