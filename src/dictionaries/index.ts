/** Dictionaries — public surface. */
export { default as i18n } from "./client";
export { en } from "./locales/en";
export { am } from "./locales/am";

export const SUPPORTED_LOCALES = ["en", "am"] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];
