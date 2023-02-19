import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { QUERY_KEY } from '../../../../constants/queryKeys';
import { Todo } from '../../../../models';
import { ResponseError } from '../../../../utils/Errors/ResponseError';

const postTodo = async (text: Todo['text']): Promise<Todo> => {
  const response = await fetch('api/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text }),
  });
  if (!response.ok) {
    throw new ResponseError('Failed to insert new todo', response);
  }
  return await response.json();
};

interface UseAddTodo {
  addTodo: (text: Todo['text']) => void;
}

function mapError(error: unknown): string {
  if (error instanceof ResponseError) return error.response.statusText;
  if (error instanceof Error) return error.message;
  return 'Unknown error';
}

export const useAddTodo = (): UseAddTodo => {
  const { enqueueSnackbar } = useSnackbar();
  const client = useQueryClient();
  const { mutate: addTodo } = useMutation(postTodo, {
    onSuccess: () => {
      enqueueSnackbar('Todo added', {
        variant: 'success',
      });
      client.invalidateQueries([QUERY_KEY.todos]);
    },
    onError: (error) => {
      const errorMessage = mapError(error);
      enqueueSnackbar(`Error on add todo: ${errorMessage}`, {
        variant: 'error',
      });
    },
  });

  return {
    addTodo,
  };
};
