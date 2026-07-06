"use client";

/**
 * hooks — formHandler.
 *
 * Utility for handling form submissions: runs the async submit, surfaces a
 * success toast, and routes any error through the centralized errorHandler
 * (which extracts the API message and shows a failure toast).
 */

import { toast } from "sonner";
import { errorHandler } from "@/lib/utils/errorHandler";

export const formHandler = {
  async submit<T>(fn: () => Promise<T>, opts?: { success?: string }): Promise<T | undefined> {
    try {
      const result = await fn();
      if (opts?.success) toast.success(opts.success);
      return result;
    } catch (error) {
      errorHandler.handle(error);
      return undefined;
    }
  },
};
