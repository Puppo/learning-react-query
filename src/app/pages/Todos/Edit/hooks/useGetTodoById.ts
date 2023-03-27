import { QueryClient, useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from 'src/app/constants/queryKeys';
import { Todo } from 'src/app/models';
import { ResponseError } from '../../../../utils/Errors/ResponseError';

const fetchTodo = async (id: Todo['id']): Promise<Todo> => {
  const response = await fetch(`api/tasks/${id}`);
  if (!response.ok) {
    throw new ResponseError(`Failed to fetch todo with id ${id}`, response);
  }
  return await response.json();
};

interface UseTodo {
  todo: Todo | null;
  isLoading: boolean;
  error?: string;
}

function mapError(error: unknown | undefined): undefined | string {
  if (!error) return undefined;
  if (error instanceof ResponseError) return error.response.statusText;
  if (error instanceof Error) return error.message;
  return 'Unknown error';
}

export const useGetTodoById = (id: Todo['id']): UseTodo => {
  const {
    data: todo = null,
    isLoading,
    error,
  } = useQuery([QUERY_KEY.todos, id], () => fetchTodo(id), {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: 2,
  });

  return {
    todo,
    isLoading,
    error: mapError(error),
  };
};

export function prefetchGetTodoById(client: QueryClient, id: Todo['id']): void {
  client.prefetchQuery([QUERY_KEY.todos, id], () => fetchTodo(id));
}
