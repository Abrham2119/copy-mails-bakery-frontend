"use client";

/**
 * hooks — useTableState.
 *
 * Table pagination / sorting / filtering / search synced to the URL. Builds on
 * useUrlState + useDebounce. Returns the current state plus setters.
 */

import { useEffect, useState } from "react";
import { useUrlState } from "./useUrlState";
import { useDebounce } from "./use-debounce";

export type SortOrder = "asc" | "desc";

export function useTableState(defaults?: { limit?: number; sort?: string; order?: SortOrder }) {
  const { get, set } = useUrlState();
  const [search, setSearch] = useState(get("search") ?? "");
  const debouncedSearch = useDebounce(search, 400);

  useEffect(() => {
    set({ search: debouncedSearch || undefined, page: 1 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  return {
    page: Number(get("page") ?? 1),
    limit: Number(get("limit") ?? defaults?.limit ?? 10),
    sort: get("sort") ?? defaults?.sort,
    order: (get("order") as SortOrder | undefined) ?? defaults?.order ?? "desc",
    search,
    setSearch,
    setPage: (page: number) => set({ page }),
    setSort: (sort: string, order: SortOrder = "asc") => set({ sort, order, page: 1 }),
  };
}
