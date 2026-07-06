import type { ReactNode } from "react";

/** Centered content container matching the theme's 1400px max width. */
export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-container px-4 ${className}`}>
      {children}
    </div>
  );
}
