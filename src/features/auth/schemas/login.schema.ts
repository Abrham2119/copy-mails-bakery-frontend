/**
 * features/auth — login schema (Zod).
 *
 * One schema is the source of truth for both runtime validation and the
 * TypeScript type (via `z.infer`). Co-located with the feature.
 */

import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
