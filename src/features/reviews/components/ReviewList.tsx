"use client";

/**
 * features/reviews — ReviewList (Step D).
 * Uses the useReviews() hook; renders loading/error/empty then the list.
 */

import { useReviews } from "../hooks/useReviews";
import { ReviewCard } from "./ReviewCard";
import { TableSkeleton } from "@/components/skeleton/TableSkeleton";
import { AppErrorState, AppEmptyState } from "@/components/feedback";

export function ReviewList({ productId }: { productId: string }) {
  const { data, isLoading, error, refetch } = useReviews(productId);

  if (isLoading) return <TableSkeleton rows={3} />;
  if (error) return <AppErrorState onRetry={() => refetch()} />;
  if (!data?.length) return <AppEmptyState message="No reviews yet" />;

  return (
    <div className="space-y-3">
      {data.map((review) => (
        <ReviewCard key={review._id} review={review} />
      ))}
    </div>
  );
}
