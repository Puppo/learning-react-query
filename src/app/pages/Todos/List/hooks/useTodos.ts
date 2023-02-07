import { useQuery } from '@tanstack/react-query';
import { Todo } from 'src/app/models';
import { ResponseError } from '../../../../utils/Errors/ResponseError';

const fetchTodos = async (): Promise<Todo[]> => {
  const response = await fetch('api/tasks');
  if (!response.ok) {
    throw new ResponseError('Failed to fetch todos', response);
  }
  return await response.json();
};

interface UseTodos {
  todos: Todo[];
  isLoading: boolean;
  isFetching: boolean;
  error?: string;
}

function mapError(error: unknown | undefined): undefined | string {
  if (!error) return undefined;
  if (error instanceof ResponseError) return error.response.statusText;
  if (error instanceof Error) return error.message;
  return 'Unknown error';
}

export const useTodos = (): UseTodos => {
  const {
    data: todos = [],
    isLoading,
    isFetching,
    error,
  } = useQuery(['todos'], fetchTodos, {
    // refetchInterval: 1000,
    refetchOnWindowFocus: false,
    retry: 2,
  });

  return {
    todos,
    isLoading,
    isFetching,
    error: mapError(error),
  };
};
