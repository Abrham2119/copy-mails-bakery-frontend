/**
 * Infrastructure — auth token storage.
 *
 * A thin wrapper around `localStorage` for token persistence. Never read
 * `localStorage` directly from a component — go through this module. SSR-safe:
 * guards against `window` being undefined during server rendering in Next.js.
 */

const TOKEN_KEY = "access_token";
const isBrowser = typeof window !== "undefined";

export const authStorage = {
  getToken: (): string | null => (isBrowser ? localStorage.getItem(TOKEN_KEY) : null),
  setToken: (token: string): void => {
    if (isBrowser) localStorage.setItem(TOKEN_KEY, token);
  },
  clear: (): void => {
    if (isBrowser) localStorage.removeItem(TOKEN_KEY);
  },
};
