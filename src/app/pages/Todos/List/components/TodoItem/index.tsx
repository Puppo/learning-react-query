import { AssignmentInd, Build, Delete } from "@mui/icons-material";
import { Grid, Paper } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { useCallback, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Todo } from "../../../../../models/todo";

const styles = {
  Icon: {
    marginLeft: "auto"
  },
  Paper: {
    margin: "auto",
    padding: 10,
    display: "flex",
    alignItems: "center",
    marginTop: 10,
    width: 500
  }
} as const;

interface TodoItemProp {
  auth: boolean;
  todo: Todo
  deleteTodo: () => void;
  assignToMe: () => void;
}

function TodoItem({
  auth,
  todo,
  deleteTodo,
  assignToMe
}: TodoItemProp) {
  const [fade, setFade] = useState<boolean>(false)
  const gridRef = useRef<HTMLDivElement | null>(null)

  const onDeleteBtnClick: React.MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    deleteTodo()
  }, [deleteTodo]);

  const onAssignBtnClick: React.MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    assignToMe()
  }, [assignToMe]);

  // const onDeleteBtnClick: React.MouseEventHandler<HTMLButtonElement> = useCallback(() => {
  //   const fade = true;
  //   setFade(fade);

  //   new Promise(function (resolve, reject) {
  //     setTimeout(function () {
  //       resolve(true);
  //     }, 500);
  //   })
  //     .then(() => deleteTodo());
  // }, [deleteTodo]);

  const gridClass = fade ? "fade-out" : "";
  const canAssign = auth && !todo.assigneeId;

  return (
    <Grid
      xs={12}
      className={`${gridClass}`}
      item
      ref={gridRef}
    >
      <Paper elevation={2} style={styles.Paper}>
        <span>{todo.text}</span>
        {
          canAssign && <IconButton
            style={styles.Icon}
            color="default"
            aria-label="Assign"
            onClick={onAssignBtnClick}
          >
            <AssignmentInd fontSize="small" />
          </IconButton>
        }
        <Link
          to={`/todos/${todo.id}`}
          style={!canAssign ? styles.Icon : {}}
        >
          <IconButton
            color="primary"
            aria-label="Edit"
          >
            <Build fontSize="small" />
          </IconButton>
        </Link>
        <IconButton
          color="secondary"
          aria-label="Delete"
          onClick={onDeleteBtnClick}
        >
          <Delete fontSize="small" />
        </IconButton>
      </Paper>
    </Grid>
  );
}

export default TodoItem;
