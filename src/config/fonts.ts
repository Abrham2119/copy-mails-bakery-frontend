import { Poppins, Lobster_Two, Work_Sans } from "next/font/google";

// Theme typography — Poppins (body), Lobster Two (headings), Work Sans (custom).
export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-poppins",
  display: "swap",
});

export const lobster = Lobster_Two({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-lobster",
  display: "swap",
});

export const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-worksans",
  display: "swap",
});

/** Combined font CSS-variable class names applied to <html>. */
export const fontVariables = `${poppins.variable} ${lobster.variable} ${workSans.variable}`;
