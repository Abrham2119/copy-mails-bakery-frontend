/**
 * lib/utils — the `cn()` class merger.
 *
 * Safely merges Tailwind classes (clsx for conditionals + tailwind-merge to
 * resolve conflicts, e.g. `p-2 p-4` → `p-4`). Use everywhere instead of
 * ad-hoc string concatenation.
 */

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
