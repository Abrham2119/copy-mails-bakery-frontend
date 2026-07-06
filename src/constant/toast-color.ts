/** constant — toast color tokens (keep toast styling consistent). */

export const TOAST_COLORS = {
  success: "#16a34a",
  error: "#dc2626",
  warning: "#d97706",
  info: "#2563eb",
} as const;

export type ToastVariant = keyof typeof TOAST_COLORS;
