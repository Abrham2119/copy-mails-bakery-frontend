/**
 * Domain layer — Review entity.
 * (Step A of the "How to add a feature" walkthrough.)
 */

export interface Review {
  _id: string;
  product_id: string;
  author_name: string;
  rating: number;
  comment: string;
  created_at: string;
}
