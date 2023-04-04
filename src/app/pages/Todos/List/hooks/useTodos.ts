import { useInfiniteQuery } from '@tanstack/react-query';
import { useState } from 'react';
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
  const response = await fetch(`api/tasks?_page=${page + 1}&_limit=${limit}`, {
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
  hasNext: boolean;
  next?: () => void;
}

export const useTodos = (): UseTodos => {
  const [limit] = useState<number>(5);

  const { data, hasNextPage, fetchNextPage, isLoading, isFetching, error } =
    useInfiniteQuery(
      [QUERY_KEY.todos],
      ({ signal, pageParam: page = 0 }) => fetchTodos(page, limit, signal),
      {
        refetchOnWindowFocus: false,
        retry: 2,
        getNextPageParam: (lastPage, pages) => {
          if (Math.ceil(lastPage.totals / limit) > pages.length)
            return pages.length;
          return undefined;
        },
      }
    );

  return {
    todos: data?.pages.flatMap(({ todos }) => todos) || [],
    isLoading,
    isFetching,
    error: mapError(error),
    next: fetchNextPage,
    hasNext: hasNextPage || false,
  };
};
