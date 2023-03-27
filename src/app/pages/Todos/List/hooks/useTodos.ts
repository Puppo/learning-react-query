import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { QUERY_KEY } from '../../../../constants/queryKeys';
import { Todo } from '../../../../models';
import { ResponseError } from '../../../../utils/Errors/ResponseError';
import { mapError } from '../../../../utils/Errors/mapError';
import { prefetchGetTodoById } from '../../Edit/hooks/useGetTodoById';

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
  setUserFilter: Dispatch<SetStateAction<number | null>>;
}

export const useTodos = (): UseTodos => {
  const client = useQueryClient();

  const [userFilter, setUserFilter] = useState<number | null>(null);

  const filterTodoByAssignee = useCallback(
    (todos: Todo[]) => {
      if (!userFilter) return todos;
      return todos.filter((todo) => todo.assigneeId === userFilter);
    },
    [userFilter]
  );

  const {
    data: todos = [],
    isLoading,
    isFetching,
    error,
  } = useQuery([QUERY_KEY.todos], fetchTodos, {
    refetchOnWindowFocus: false,
    retry: 2,
    select: filterTodoByAssignee,
    onSuccess: (data) => {
      data.forEach((todo) => {
        prefetchGetTodoById(client, todo.id);
      });
    },
  });

  return {
    todos,
    isLoading,
    isFetching,
    error: mapError(error),
    setUserFilter,
  };
};
