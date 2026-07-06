"use client";

/**
 * components/feedback — AppErrorState. Consistent error UX with optional retry.
 */

import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function AppErrorState({
  title = "Something broke",
  description = "Please try again.",
  onRetry,
}: {
  title?: string;
  description?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
      <AlertTriangle className="h-10 w-10 text-red-500" aria-hidden />
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-ink/60">{description}</p>
      </div>
      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry}>
          Try again
        </Button>
      )}
    </div>
  );
}
