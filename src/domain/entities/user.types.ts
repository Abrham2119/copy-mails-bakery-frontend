/**
 * Domain layer — User entity.
 */

import type { Permission } from "@/domain/enums/permission.enum";

export type UserRole = "customer" | "installer" | "admin";

export interface User {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  role: UserRole;
  /**
   * Permission-based access control: the granted capabilities the user carries.
   * Guards and the <Can> component read from this list. The API is the
   * authority on what is granted.
   */
  permissions: Permission[];
  avatar_url: string | null;
  created_at: string;
}
