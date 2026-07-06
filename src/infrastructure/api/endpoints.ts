/**
 * Infrastructure — endpoints registry.
 *
 * The single home for every endpoint string. Never scatter URL literals across
 * feature services — reference them from here so a path change is one edit.
 */

export const API_ENDPOINTS = {
  auth: {
    login: "auth/login",
    register: "auth/register",
    logout: "auth/logout",
    me: "auth/me",
  },
  order: {
    root: "orders/my-orders",
    byId: (id: string) => `orders/${id}/with-products`,
  },
  products: {
    root: "products",
    byId: (id: string) => `products/${id}`,
  },
  // Example of adding a new feature's endpoints (see "How to add a feature").
  reviews: {
    root: "reviews",
    byProduct: (productId: string) => `reviews?product=${productId}`,
  },
} as const;
