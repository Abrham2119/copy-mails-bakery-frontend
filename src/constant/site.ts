/**
 * Site-wide configuration extracted from the original storefront.
 * Single source of truth for metadata and contact details.
 */
export const SITE = {
  name: "Cakes & Bakes",
  /** The storefront's password-page hint, preserved from the original title. */
  tagline: "Cakes & Bakes (password: buddha)",
  contact: {
    address: "No: 58 A, East Madison Street, Baltimore, MD, USA 4508.",
    phone: "0000 - 123456789",
    hours: "9.30AM - 7.30PM",
    email: "mail@example.com",
  },
  social: {
    facebook: "#",
    pinterest: "#",
    instagram: "#",
  },
  copyright: "© 2026 Cakes & Bakes (password: buddha) Design Themes",
} as const;

export type Site = typeof SITE;
