import { useQuery } from '@tanstack/react-query';
import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { QUERY_KEY } from 'src/app/constants/queryKeys';
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
  setUserFilter: Dispatch<SetStateAction<number | null>>;
}

function mapError(error: unknown | undefined): undefined | string {
  if (!error) return undefined;
  if (error instanceof ResponseError) return error.response.statusText;
  if (error instanceof Error) return error.message;
  return 'Unknown error';
}

export const useTodos = (): UseTodos => {
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
  });

  return {
    todos,
    isLoading,
    isFetching,
    error: mapError(error),
    setUserFilter,
  };
};
