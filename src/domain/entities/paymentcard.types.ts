/**
 * Domain layer — payment entities.
 */

export interface PaymentDetails {
  _id: string;
  method: "card" | "cash_on_delivery" | "mobile_money" | "bank_transfer";
  status: "pending" | "paid" | "failed" | "refunded";
  amount: number;
  currency: string;
  paid_at: string | null;
}

export interface PaymentCard {
  _id: string;
  brand: string;
  last4: string;
  exp_month: number;
  exp_year: number;
  is_default: boolean;
}
