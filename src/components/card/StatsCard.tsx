/**
 * components/card — StatsCard. Reusable KPI/stat tile.
 */

import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

export function StatsCard({
  label,
  value,
  icon,
  className,
}: {
  label: string;
  value: ReactNode;
  icon?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("rounded-xl border border-line p-4", className)}>
      <div className="flex items-center justify-between">
        <p className="text-sm text-ink/60">{label}</p>
        {icon}
      </div>
      <p className="mt-2 text-2xl font-semibold">{value}</p>
    </div>
  );
}
