"use client";

/**
 * hooks — useListingParams.
 *
 * Generic listing state (pagination + search + filters) synced to the URL, with
 * a debounced search. Feature list components (tables, product grids) call this
 * so listing state is bookmarkable and shareable.
 */

import { useEffect, useState } from "react";
import { useUrlState } from "./useUrlState";
import { useDebounce } from "./use-debounce";

export function useListingParams(defaults?: { limit?: number }) {
  const { get, set } = useUrlState();
  const [search, setSearch] = useState(get("search") ?? "");
  const debouncedSearch = useDebounce(search, 400);

  useEffect(() => {
    // Reset to page 1 whenever the (debounced) search term changes.
    set({ search: debouncedSearch || undefined, page: 1 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  return {
    page: Number(get("page") ?? 1),
    limit: Number(get("limit") ?? defaults?.limit ?? 10),
    search,
    setSearch,
    setPage: (page: number) => set({ page }),
  };
}
