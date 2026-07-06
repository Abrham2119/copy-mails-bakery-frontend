/**
 * components — NotFound. Reusable 404 body. Wire into `app/not-found.tsx` if you
 * want a custom Next.js not-found page.
 */

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { PATHS } from "@/constant/paths";

export function NotFound() {
  return (
    <div className="grid min-h-[60vh] place-items-center p-6 text-center">
      <div className="space-y-3">
        <p className="font-heading text-5xl text-brand">404</p>
        <p className="text-ink/60">This page could not be found.</p>
        <Link href={PATHS.home}>
          <Button>Back home</Button>
        </Link>
      </div>
    </div>
  );
}
