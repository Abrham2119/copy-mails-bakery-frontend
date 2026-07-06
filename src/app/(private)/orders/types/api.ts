/**
 * orders/types — feature-local request/response shapes.
 *
 * `CommonParams` carries an index signature so it can flow straight into
 * `buildQueryString` and query-key factories (a typed params bag).
 */

export interface CommonParams {
  page?: number;
  limit?: number;
  search?: string;
  sort?: string;
  order?: "asc" | "desc";
  [key: string]: string | number | boolean | undefined;
}

export type OrderParams = CommonParams & { status?: string };
