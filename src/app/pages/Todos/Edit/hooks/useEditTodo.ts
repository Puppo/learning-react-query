import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { QUERY_KEY } from '../../../../constants/queryKeys';
import { Todo } from '../../../../models';
import { ResponseError } from '../../../../utils/Errors/ResponseError';
import { mapError } from '../../../../utils/Errors/mapError';

const editTodoRequest = async (todo: Todo): Promise<Todo> => {
  const response = await fetch(`api/tasks/${todo.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  });
  if (!response.ok) {
    throw new ResponseError(`Failed to edit todo with id ${todo.id}`, response);
  }
  return await response.json();
};

type UseEditTodo = (todo: Todo) => void;

export const useEditTodo = (): UseEditTodo => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const client = useQueryClient();
  const { mutate: editTodo } = useMutation<
    Todo,
    unknown,
    Todo,
    {
      oldTodos?: Todo[];
      oldTodo?: Todo;
      messageKey: string | number;
    }
  >(editTodoRequest, {
    onMutate: (todo) => {
      const messageKey = enqueueSnackbar('Todo edited', {
        variant: 'success',
      });
      const oldTodos = client.getQueryData<Todo[]>([QUERY_KEY.todos]);
      const oldTodo = client.getQueryData<Todo>([QUERY_KEY.todos, todo.id]);
      client.setQueryData([QUERY_KEY.todos, todo.id], todo);
      client.setQueryData<Todo[]>([QUERY_KEY.todos], (oldTodos) =>
        oldTodos?.map((oldTodo) => (oldTodo.id === todo.id ? todo : oldTodo))
      );

      return {
        oldTodos,
        oldTodo,
        messageKey,
      };
    },
    onSuccess: () => {
      client.invalidateQueries([QUERY_KEY.todos]);
    },
    onError: (error, todo, ctx) => {
      if (!ctx) return;
      const { oldTodos, oldTodo, messageKey } = ctx;
      closeSnackbar(messageKey);
      const errorMessage = mapError(error);
      enqueueSnackbar(
        `Ops! There was an error on editing todo: ${errorMessage}`,
        {
          variant: 'error',
        }
      );
      client.setQueryData([QUERY_KEY.todos, todo.id], oldTodo);
      client.setQueryData<Todo[]>([QUERY_KEY.todos], oldTodos);
    },
  });

  return editTodo;
};
