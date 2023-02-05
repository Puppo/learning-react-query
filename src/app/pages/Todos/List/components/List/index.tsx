import { Grid } from "@mui/material";
import { useSnackbar } from "notistack";
import { Todo } from "../../../../../models";
import TodoItem from "../TodoItem";

interface ListProps {
  auth: boolean,
  list: Todo[]
}

function List({
  auth,
  list,
}: ListProps) {
  const { enqueueSnackbar } = useSnackbar();

  const deleteTodo = (todo: Todo) => {
    // TODO: add todo
    enqueueSnackbar('Delete Todo', {
      variant: 'success'
    })
  };

  const assignToMe = (todo: Todo) => {
    // TODO: add todo
    enqueueSnackbar('Assign Todo to you', {
      variant: 'success'
    })
  };


  return <Grid container>
    {list.map(todo =>
      <TodoItem
        key={todo.id}
        auth={auth}
        todo={todo}
        deleteTodo={() => deleteTodo(todo)}
        assignToMe={() => assignToMe(todo)}
      />)}
  </Grid>

}

export default List;
