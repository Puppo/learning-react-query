import { useQuery } from '@tanstack/react-query';
import { Dispatch, SetStateAction, useState } from 'react';
import { QUERY_KEY } from '../../../../constants/queryKeys';
import { Todo } from '../../../../models';
import { ResponseError } from '../../../../utils/Errors/ResponseError';
import { mapError } from '../../../../utils/Errors/mapError';

const fetchTodos = async (
  page: number,
  limit: number,
  signal: AbortSignal | undefined
): Promise<{
  totals: number;
  todos: Todo[];
}> => {
  const response = await fetch(`api/tasks?_page=${page}&_limit=${limit}`, {
    signal,
  });
  if (!response.ok) {
    throw new ResponseError('Failed to fetch todos', response);
  }
  const todos: Todo[] = await response.json();
  const totals = Number.parseInt(
    response.headers.get('x-total-count') || '0',
    10
  );

  return {
    totals,
    todos,
  };
};

interface UseTodos {
  todos: Todo[];
  isLoading: boolean;
  isFetching: boolean;
  error?: string;
  pages: number;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}

export const useTodos = (): UseTodos => {
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(5);

  const {
    data: { todos, totals } = {
      todos: [],
      totals: 0,
    },
    isLoading,
    isFetching,
    error,
  } = useQuery(
    [QUERY_KEY.todos, page, limit],
    ({ signal }) => fetchTodos(page, limit, signal),
    {
      refetchOnWindowFocus: false,
      retry: 2,
    }
  );

  return {
    todos,
    isLoading,
    isFetching,
    error: mapError(error),
    pages: Math.ceil(totals / limit),
    page,
    setPage,
  };
};
