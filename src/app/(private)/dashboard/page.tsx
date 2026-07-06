/**
 * Route: /dashboard — a minimal protected page demonstrating the guarded group.
 */

export default function DashboardPage() {
  return (
    <div className="space-y-2">
      <h1 className="text-xl font-semibold">Dashboard</h1>
      <p className="text-sm text-ink/60">
        You are inside the protected <code>(private)</code> route group. Try{" "}
        <a className="text-brand underline" href="/orders">
          /orders
        </a>{" "}
        for the full data-fetching vertical.
      </p>
    </div>
  );
}
