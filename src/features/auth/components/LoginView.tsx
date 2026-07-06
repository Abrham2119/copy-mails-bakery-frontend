"use client";

/**
 * features/auth — LoginView.
 *
 * Presentation for sign-in. Form state via React Hook Form, validation via the
 * Zod schema, submission via the useLogin mutation. Errors are surfaced through
 * the centralized errorHandler. No transport logic lives here.
 */

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormValues } from "../schemas/login.schema";
import { useLogin } from "../hooks/useLogin";
import { Button } from "@/components/ui/Button";
import { errorHandler } from "@/lib/utils/errorHandler";
import { cn } from "@/lib/utils/cn";

export function LoginView() {
  const { mutateAsync, isPending } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (values: LoginFormValues) => {
    try {
      await mutateAsync(values);
    } catch (error) {
      errorHandler.handle(error);
    }
  };

  const field = "w-full rounded-md border border-line px-3 py-2 text-sm outline-none focus:border-brand";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-1">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <input id="email" type="email" className={field} placeholder="you@example.com" {...register("email")} />
        {errors.email && <p className="text-xs text-red-600">{errors.email.message}</p>}
      </div>

      <div className="space-y-1">
        <label htmlFor="password" className="text-sm font-medium">
          Password
        </label>
        <input id="password" type="password" className={field} placeholder="••••••••" {...register("password")} />
        {errors.password && <p className="text-xs text-red-600">{errors.password.message}</p>}
      </div>

      <Button type="submit" disabled={isPending} className={cn("w-full")}>
        {isPending ? "Signing in…" : "Sign in"}
      </Button>
    </form>
  );
}
