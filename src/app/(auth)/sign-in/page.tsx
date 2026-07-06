/**
 * Route: /sign-in — composes the auth feature's LoginView inside AuthLayout.
 */

import { AuthLayout } from "@/components/AuthLayout";
import { LoginView } from "@/features/auth";

export default function SignInPage() {
  return (
    <AuthLayout title="Welcome back">
      <LoginView />
    </AuthLayout>
  );
}
