/**
 * Domain layer — Order entities.
 *
 * The flagship worked example from the architecture guide. Pure TypeScript,
 * framework-agnostic. `OrderStatus` is a typed union (see also
 * `src/domain/enums/`), `Order` is the main business entity, `OrderResponse` is
 * the API wrapper with pagination.
 */

import type { OrderAddress } from "@/domain/entities/address.types";
import type { OrderItemProduct } from "@/domain/entities/product.types";
import type { PaymentDetails } from "@/domain/entities/paymentcard.types";

/** Strongly-typed order lifecycle states. */
export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "refunded";

export interface OrderItem {
  _id: string;
  product_id: OrderItemProduct;
  quantity: number;
  unit_price: number;
  subtotal: number;
}

export interface Order {
  _id: string;
  user_id: string;
  user_type: string;
  billing_id: OrderAddress | null;
  shipping_id: OrderAddress | null;
  ship_to_different_address: boolean;
  subtotal: number;
  shipping_fee: number;
  discount_amount: number;
  tax_amount: number;
  total_amount: number;
  currency: string;
  order_notes: string;
  status: OrderStatus;
  placed_at: string;
  created_at: string;
  updated_at: string;
  __v: number;
  payment_id?: PaymentDetails;
  items?: OrderItem[];
  items_count?: number;
}

/** Server list response — data + pagination metadata. */
export interface OrderResponse {
  success: boolean;
  data: Order[];
  pagination: {
    total: number;
    count: number;
    page: number;
    limit: number;
    total_pages: number;
    has_next_page: boolean;
    has_prev_page: boolean;
    next_page: number | null;
    prev_page: number | null;
  };
}
