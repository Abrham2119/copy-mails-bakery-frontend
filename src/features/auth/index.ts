/**
 * features/auth — public surface (barrel).
 * Expose only what other parts of the app need; internals stay internal.
 */
export { LoginView } from "./components/LoginView";
export { Can } from "./components/Can";
export { useLogin } from "./hooks/useLogin";
export { authService } from "./api/authService";
export type { AuthResult, LoginPayload } from "./api/authService";
