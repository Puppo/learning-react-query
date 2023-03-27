import { ZodError, ZodType, z } from 'zod';

export class ValidationError extends Error {
  constructor(message: string, public readonly cause: ZodError) {
    super(message);
  }
}

export const validation = <T extends ZodType>(
  schema: T,
  data: unknown
): z.infer<T> => {
  const result = schema.safeParse(data);
  if (result.success) return result.data;

  throw new ValidationError('Validation error', result.error);
};
