export type ValidationResult<T> =
  | { valid: true; values: T }
  | { valid: false; errors: Record<string, string> };
