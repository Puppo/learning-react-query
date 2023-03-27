import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from 'src/app/constants/queryKeys';
import { Todo } from 'src/app/models';
import { User, useUser } from '../../../../auth/useUser';
import { ResponseError } from '../../../../utils/Errors/ResponseError';
import { mapError } from '../../../../utils/Errors/mapError';

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
