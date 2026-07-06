/** types — shared param shapes for listings/pagination (global, not feature). */

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface ListParams extends PaginationParams {
  search?: string;
  sort?: string;
  order?: "asc" | "desc";
  [key: string]: string | number | boolean | undefined;
}
