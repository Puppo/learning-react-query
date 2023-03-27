import { ResponseError } from './ResponseError';

export function mapError(error?: unknown): string | undefined {
  if (!error) return;
  if (error instanceof ResponseError) return error.response.statusText;
  if (error instanceof Error) return error.message;
  return 'Unknown error';
}
