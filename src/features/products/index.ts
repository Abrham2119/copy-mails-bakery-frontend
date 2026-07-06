/** features/products — public surface. */
export { ProductGrid } from "./components/ProductGrid";
export { ProductCard } from "./components/ProductCard";
export { useProducts, useProduct } from "./hooks/useProducts";
export { productService } from "./api/productService";
export type { ProductParams, ProductListResponse } from "./types/api";
