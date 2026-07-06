/**
 * lib — query-builder re-export.
 *
 * Convenience root-level entry so features can `import { buildQueryString } from
 * "@/lib/query-builder"`. Implementation lives in `lib/utils/queryBuilder.ts`.
 */

export { buildQueryString, type QueryParams } from "./utils/queryBuilder";
