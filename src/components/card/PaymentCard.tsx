/**
 * components/card — PaymentCard. Displays a saved payment method.
 */

import { CreditCard } from "lucide-react";
import type { PaymentCard as PaymentCardModel } from "@/domain/entities/paymentcard.types";
import { cn } from "@/lib/utils/cn";

export function PaymentCard({ card }: { card: PaymentCardModel }) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-xl border border-line p-4",
        card.is_default && "ring-1 ring-brand",
      )}
    >
      <CreditCard className="h-6 w-6 text-brand" />
      <div className="text-sm">
        <p className="font-medium">
          {card.brand} •••• {card.last4}
        </p>
        <p className="text-ink/60">
          Expires {String(card.exp_month).padStart(2, "0")}/{card.exp_year}
        </p>
      </div>
      {card.is_default && <span className="ml-auto text-xs text-brand">Default</span>}
    </div>
  );
}
