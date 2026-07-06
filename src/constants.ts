/**
 * src/constants — root-level constant aggregator.
 * Re-exports the most-used constants so callers can `import { PATHS } from
 * "@/constants"`. Feature/domain constants stay in their own modules.
 */

export { PATHS } from "@/constant/paths";
export { DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE, DEBOUNCE_MS } from "@/constant/variables";
export { SUPPORTED_LOCALES, type Locale } from "@/dictionaries";
