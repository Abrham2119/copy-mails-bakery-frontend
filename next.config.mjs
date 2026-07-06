import { apiRewrites } from "./src/config/api-rewrites.ts";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // All assets are migrated locally into /public/images.
    // Allow the original Shopify CDN as a remote fallback if ever needed.
    remotePatterns: [
      { protocol: "https", hostname: "**.myshopify.com" },
      { protocol: "https", hostname: "cdn.shopify.com" },
    ],
  },
  async rewrites() {
    return apiRewrites;
  },
};

export default nextConfig;
