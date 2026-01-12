export interface SuccessOptions<T = unknown> {
  data?: T;
  message?: string;
  statusCode?: number;
  meta?: Record<string, unknown>;
}

export interface ErrorOptions {
  error?: string;
  message?: string;
  statusCode?: number;
  details?: unknown;
}