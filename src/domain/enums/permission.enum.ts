/**
 * Domain layer — Permission enum (access model).
 *
 * Authorization in this app is *permission-based*, not role-based. On login the
 * user receives a list of granted permissions; guards (`ProtectedRoute`) and the
 * `<Can>` component check for the permission(s) they require before allowing
 * access. Define them as a typed union so the store, guards and `<Can>` all
 * share one source of truth. Extend as new capabilities are added — the API is
 * the authority on what is actually granted.
 */

export type Permission =
  | "orders.view"
  | "orders.create"
  | "orders.update"
  | "orders.delete"
  | "products.view"
  | "products.create"
  | "products.update"
  | "products.delete"
  | "quotes.view"
  | "quotes.manage"
  | "installers.view"
  | "settings.view"
  | "settings.manage";
