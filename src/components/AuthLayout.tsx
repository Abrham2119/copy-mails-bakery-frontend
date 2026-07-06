/**
 * components — AuthLayout. Centered card chrome for auth screens.
 */

import type { ReactNode } from "react";

export function AuthLayout({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <div className="grid min-h-screen place-items-center bg-accent/10 p-4">
      <div className="w-full max-w-md rounded-xl border border-line bg-white p-8 shadow-sm">
        {title && <h1 className="mb-6 text-center font-heading text-2xl text-brand">{title}</h1>}
        {children}
      </div>
    </div>
  );
}
