/**
 * features/products — metadata service.
 * Example of a second service in the same feature (categories/filters metadata).
 */

import { apiClient } from "@/infrastructure/api/api";

export interface Category {
  _id: string;
  name: string;
  slug: string;
}

export const metadataService = {
  getCategories: async (): Promise<Category[]> => {
    const { data } = await apiClient.get<{ data: Category[] }>("products/categories");
    return data.data;
  },
};
