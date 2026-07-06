/**
 * components/feedback — AppEmptyState. Consistent "nothing here" UX.
 */

import { PackageOpen } from "lucide-react";

export function AppEmptyState({ message = "Nothing here yet" }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-center text-ink/60">
      <PackageOpen className="h-10 w-10" aria-hidden />
      <p className="text-sm">{message}</p>
    </div>
  );
}
