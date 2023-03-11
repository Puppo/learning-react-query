import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from 'src/app/constants/queryKeys';
import { Todo } from 'src/app/models';
import { User, useUser } from '../../../../auth/useUser';
import { ResponseError } from '../../../../utils/Errors/ResponseError';

const fetchTodos = async (user: User): Promise<Todo[]> => {
  const response = await fetch(`api/tasks?assigneeId=${user.user.id}`, {
    headers: {
      Authorization: `Bearer ${user.accessToken}`,
    },
  });
  if (!response.ok) {
    throw new ResponseError('Failed to fetch my todos', response);
  }
  return await response.json();
};

interface UseMyTodos {
  todos: Todo[];
  error?: string;
}

function mapError(error: unknown | undefined): undefined | string {
  if (!error) return undefined;
  if (error instanceof ResponseError) return error.response.statusText;
  if (error instanceof Error) return error.message;
  return 'Unknown error';
}

export const useMyTodos = (): UseMyTodos => {
  const { user } = useUser();

  const { data: todos = [], error } = useQuery(
    [QUERY_KEY.myTodos],
    () => fetchTodos(user!),
    {
      refetchOnWindowFocus: false,
      retry: 2,
      enabled: !!user,
    }
  );

  return {
    todos,
    error: mapError(error),
  };
};
