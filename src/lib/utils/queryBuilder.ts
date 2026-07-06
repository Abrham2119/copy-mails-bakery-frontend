/**
 * lib/utils — query-string builder.
 *
 * Build query strings from a params object in one place; never concatenate query
 * strings by hand in a service. Skips null/undefined/empty values.
 */

export type QueryParams = Record<string, string | number | boolean | null | undefined>;

export function buildQueryString(params: QueryParams): string {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value === null || value === undefined || value === "") continue;
    search.append(key, String(value));
  }
  const qs = search.toString();
  return qs ? `?${qs}` : "";
}
