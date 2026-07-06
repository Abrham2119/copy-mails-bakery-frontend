/** features/products — feature-local request/response shapes. */

import type { Product } from "@/domain/entities/product.types";

export interface ProductParams {
  page?: number;
  limit?: number;
  search?: string;
  category_id?: string;
  [key: string]: string | number | boolean | undefined;
}

export interface ProductListResponse {
  success: boolean;
  data: Product[];
  pagination: {
    page: number;
    total_pages: number;
    total: number;
  };
}
