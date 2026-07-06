/**
 * api-rewrites — dev API proxy rules.
 *
 * Spread into next.config.mjs to forward `/api/*` requests to the backend
 * during development, avoiding CORS by keeping everything on the same origin.
 *
 *   // next.config.mjs
 *   import { apiRewrites } from "./src/config/api-rewrites.ts";
 *   const nextConfig = { async rewrites() { return apiRewrites; } };
 */

export const apiRewrites = [
  {
    source: "/api/:path*",
    destination: `${process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000/v1"}/:path*`,
  },
];
