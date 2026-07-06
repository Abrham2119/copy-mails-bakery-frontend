/**
 * lib/utils — centralized error handler.
 *
 * One place to change toast styling, logging, or Sentry wiring. Always route
 * caught errors through `errorHandler.handle(error)` instead of ad-hoc alerts.
 *
 *   import { errorHandler } from "@/lib/utils/errorHandler";
 *   try { ...API call... } catch (error) { errorHandler.handle(error); }
 */

import { AxiosError } from "axios";
import { toast } from "sonner";

export const errorHandler = {
  /** Extract a human-readable message from any error shape. */
  parse(error: unknown): string {
    if (error instanceof AxiosError) {
      return (
        (error.response?.data as { message?: string } | undefined)?.message ??
        error.message ??
        "Something went wrong"
      );
    }
    if (error instanceof Error) return error.message;
    return "An unexpected error occurred";
  },

  /** Parse, surface a toast, and (in dev) log. Returns the message. */
  handle(error: unknown): string {
    const message = this.parse(error);
    toast.error(message);
    if (process.env.NODE_ENV !== "production") console.error(error);
    return message;
  },
};
