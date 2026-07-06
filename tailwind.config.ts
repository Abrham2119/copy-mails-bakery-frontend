import type { Config } from "tailwindcss";

/**
 * Design tokens ported verbatim from the original DT "Cakes & Bakes" theme
 * (its CSS custom properties). Components use these utilities instead of the
 * legacy stylesheet, so the look is preserved while the codebase is pure
 * Tailwind + React.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#ff599a", // --DTLinkHoverColor / accent pink
          dark: "#e84684",
        },
        accent: "#ffe450", // --DT_Button_border_Color (yellow)
        ink: "#000000", // --DTColor_Body / Heading
        line: "#e9e9e9", // --DTColor_Border
        form: "#f8f8f8", // --DTform_BG
        teal: "#2f8f8f", // pricing "Menu Items" section bg
        leaf: "#9fcf6a", // FAQ / support section green
        cream: "#fff5e1",
      },
      fontFamily: {
        heading: ["var(--font-lobster)", "cursive"], // Lobster Two
        body: ["var(--font-poppins)", "sans-serif"], // Poppins
        custom: ["var(--font-worksans)", "sans-serif"], // Work Sans
      },
      fontSize: {
        h1: ["48px", { lineHeight: "1.5em" }],
        h2: ["60px", { lineHeight: "1.5em" }],
        h3: ["30px", { lineHeight: "1.5em" }],
        h4: ["28px", { lineHeight: "1.5em" }],
        h5: ["24px", { lineHeight: "1.5em" }],
        h6: ["20px", { lineHeight: "1.5em" }],
      },
      borderRadius: {
        theme: "15px", // --DTRadius
        btn: "40px", // --DT_Button_Border_Radius
        blog: "5px", // --DT_Blog_Border_Radius
      },
      maxWidth: {
        container: "1400px", // --DTContainer
      },
      boxShadow: {
        theme: "0 0 10px #bbbbbb",
        light: "0 0 10px #e9e9e9",
      },
      transitionProperty: { theme: "all" },
      lineHeight: { body: "1.8em", heading: "1.5em" },
    },
  },
  plugins: [],
};

export default config;
