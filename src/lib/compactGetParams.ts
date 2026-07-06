/**
 * lib — compactGetParams.
 *
 * Strips empty/null/undefined keys from a params object before it is turned into
 * a query string or a query key. Keeps URLs and cache keys tidy.
 */

export function compactGetParams<T extends Record<string, unknown>>(params: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(params).filter(
      ([, value]) => value !== null && value !== undefined && value !== "",
    ),
  ) as Partial<T>;
}
