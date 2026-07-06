/**
 * proxy — dev API proxy rules (reference).
 *
 * In Next.js, rewrites live in `next.config.mjs`. Keep the rule list here as the
 * single source and spread it into the config:
 *
 *   // next.config.mjs
 *   import { apiRewrites } from "./src/proxy.ts"; // (or inline the array)
 *   const nextConfig = { async rewrites() { return apiRewrites; } };
 *
 * This forwards `/api/*` to the backend during development so the browser talks
 * to the same origin (no CORS), mirroring the Vite `server.proxy` pattern.
 */

export const apiRewrites = [
  {
    source: "/api/:path*",
    destination: `${process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000/v1"}/:path*`,
  },
];
