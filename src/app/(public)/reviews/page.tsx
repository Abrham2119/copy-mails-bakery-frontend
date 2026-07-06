/**
 * Route: /reviews — Step E of the "add a feature" walkthrough.
 * A thin public page that composes the reviews feature component.
 */

import { ReviewList } from "@/features/reviews";

export default function ReviewsPage() {
  // In a real page the product id comes from route params or a selected product.
  const demoProductId = "demo-product-id";
  return (
    <main className="mx-auto max-w-2xl space-y-4 p-6">
      <h1 className="font-heading text-2xl text-brand">Customer Reviews</h1>
      <ReviewList productId={demoProductId} />
    </main>
  );
}
