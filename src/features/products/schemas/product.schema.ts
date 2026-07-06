/**
 * features/products — Zod schema.
 * One schema is the source of truth for validation AND the TS type. Also useful
 * at the network boundary to fail fast on malformed responses.
 */

import { z } from "zod";

export const productSchema = z.object({
  _id: z.string(),
  name: z.string().min(1),
  price: z.number().nonnegative(),
  currency: z.string(),
});

export type ProductInput = z.infer<typeof productSchema>;
