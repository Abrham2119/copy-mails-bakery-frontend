/** constant — static (non-parameterized) validation text. */

export const STATIC_VALIDATION_MESSAGE = {
  REQUIRED: "This field is required",
  INVALID_EMAIL: "Enter a valid email",
  PASSWORD_TOO_SHORT: "Password must be at least 8 characters",
  PASSWORDS_DONT_MATCH: "Passwords do not match",
} as const;
