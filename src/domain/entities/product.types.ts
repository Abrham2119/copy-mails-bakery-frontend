/**
 * Domain layer — Product entity (commerce/API model).
 *
 * NOTE: This is the *API* product model (has `_id`, numeric `price`), used by the
 * orders / products feature slices and the cart store. It is intentionally
 * separate from the storefront/CMS display model in
 * `src/domain/entities/catalog.types.ts` (`Product` with string prices), which
 * powers the marketing home page. Two layers, two shapes — imported explicitly
 * per-file, so they never collide.
 */

export interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  currency: string;
  image: string;
  in_stock: boolean;
  rating: number;
  reviews_count: number;
  category_id: string;
}

/** Lightweight product snapshot embedded inside an order item. */
export interface OrderItemProduct {
  _id: string;
  name: string;
  image: string;
  price: number;
}
