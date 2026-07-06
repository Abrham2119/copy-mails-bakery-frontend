/** constant — reusable validation message builders (dynamic). */

export const validationMessage = {
  required: (field: string) => `${field} is required`,
  min: (field: string, n: number) => `${field} must be at least ${n} characters`,
  max: (field: string, n: number) => `${field} must be at most ${n} characters`,
  email: () => "Enter a valid email",
};
