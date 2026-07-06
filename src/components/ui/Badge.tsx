/**
 * components/ui — Badge (atom). Styling-only status/label pill.
 */

import { cn } from "@/lib/utils/cn";

export function Badge({
  className,
  dotClassName,
  children,
}: {
  className?: string;
  dotClassName?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        className,
      )}
    >
      {dotClassName && <span className={cn("h-1.5 w-1.5 rounded-full", dotClassName)} />}
      {children}
    </span>
  );
}
