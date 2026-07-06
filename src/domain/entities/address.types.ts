/**
 * Domain layer — Address entity.
 *
 * Framework-agnostic: no React, no Axios, no UI concerns. Pure TypeScript that
 * describes *what an address is* in our business domain. Services, hooks,
 * components, forms and tests all share these definitions as the single source
 * of truth.
 */

export interface OrderAddress {
  _id: string;
  full_name: string;
  phone: string;
  country: string;
  city: string;
  /** Street / building / apartment line. */
  address_line: string;
  postal_code: string | null;
  is_default: boolean;
}
