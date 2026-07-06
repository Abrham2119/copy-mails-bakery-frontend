/** types — base interfaces every entity can extend. */

export interface BaseEntity {
  _id: string;
  created_at: string;
  updated_at?: string;
}

export type ID = string;
