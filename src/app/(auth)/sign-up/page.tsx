/**
 * Route: /sign-up — placeholder mirroring the sign-in structure. Build a
 * SignupView in features/auth/components and compose it here.
 */

import { AuthLayout } from "@/components/AuthLayout";

export default function SignUpPage() {
  return (
    <AuthLayout title="Create account">
      <p className="text-center text-sm text-ink/60">
        Add a <code>SignupView</code> to <code>features/auth/components</code> and render it here,
        following the LoginView pattern.
      </p>
    </AuthLayout>
  );
}
