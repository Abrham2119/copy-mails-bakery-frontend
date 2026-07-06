/**
 * features/reviews — ReviewCard (Step D). Presentational only.
 */

import { Star } from "lucide-react";
import type { Review } from "@/domain/entities/review.types";
import { cn } from "@/lib/utils/cn";

export function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="rounded-xl border border-line p-4">
      <div className="flex items-center justify-between">
        <p className="font-medium">{review.author_name}</p>
        <div className="flex" aria-label={`${review.rating} out of 5`}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={cn("h-4 w-4", i < review.rating ? "fill-accent text-accent" : "text-line")}
            />
          ))}
        </div>
      </div>
      <p className="mt-2 text-sm text-ink/70">{review.comment}</p>
      <time className="mt-2 block text-xs text-ink/40">
        {new Date(review.created_at).toLocaleDateString()}
      </time>
    </article>
  );
}
