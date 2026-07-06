/**
 * constant — typed route paths.
 *
 * One source of truth for every URL. Never hardcode path strings in components;
 * reference `PATHS` so a route rename is a single edit. Dynamic segments are
 * builder functions.
 */

export const PATHS = {
  home: "/",
  aboutUs: "/about-us",
  contactUs: "/contact-us",
  cart: "/cart",
  installer: "/installer",
  product: (id: string | number = ":id") => `/product/${id}`,
  productList: (id: string | number = ":id") => `/product-list/${id}`,

  auth: {
    signIn: "/sign-in",
    signUp: "/sign-up",
  },

  // Protected area (app/(private)).
  dashboard: "/dashboard",
  orders: "/orders",
  orderDetail: (id: string | number = ":id") => `/orders/${id}`,
  products: "/products",
  quotes: "/quotes",
  settings: "/settings",
} as const;
