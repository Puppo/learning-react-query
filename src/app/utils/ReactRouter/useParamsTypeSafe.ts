import { useParams } from 'react-router-dom';
import { ZodType, z } from 'zod';
import { validation } from '../zod/validation';

export const useParamsTypeSafe = <T extends ZodType>(schema: T): z.infer<T> => {
  const params = useParams();
  return validation(schema, params);
};
