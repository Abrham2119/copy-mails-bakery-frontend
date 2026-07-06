/**
 * components/button — PrimaryButton. Convenience wrapper over the Button atom.
 */

import { Button, type ButtonProps } from "@/components/ui/Button";

export function PrimaryButton(props: Omit<ButtonProps, "variant">) {
  return <Button variant="primary" {...props} />;
}
