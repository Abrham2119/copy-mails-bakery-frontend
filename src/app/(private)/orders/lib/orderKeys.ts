/**
 * orders/lib — query-key factory.
 *
 * One factory per feature; never scatter inline key arrays. Mutations invalidate
 * `orderKeys.all` to refetch every orders query.
 */

export const orderKeys = {
  all: ["orders"] as const,
  list: (params?: Record<string, unknown>) => [...orderKeys.all, "list", params] as const,
  byId: (id: string) => [...orderKeys.all, "detail", id] as const,
};
