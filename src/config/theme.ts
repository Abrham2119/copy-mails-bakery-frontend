/**
 * config — design tokens (mirrors tailwind.config.ts).
 *
 * Plain-TS access to brand tokens for places that need them in JS (charts,
 * inline styles, canvas). Keep in sync with `tailwind.config.ts`.
 */

export const theme = {
  colors: {
    brand: "#ff599a",
    accent: "#ffe450",
    ink: "#1f1f1f",
    line: "#e5e5e5",
  },
  radius: {
    button: "40px",
  },
  container: {
    maxWidth: "1400px",
  },
  fonts: {
    heading: "var(--font-heading)",
    body: "var(--font-body)",
  },
} as const;

export type Theme = typeof theme;
