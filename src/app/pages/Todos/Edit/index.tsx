import { Save } from "@mui/icons-material";
import { Box, Grid, Paper } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import { useRef } from "react";
import { z } from "zod";
import { CircularLoader } from "../../../components";
import { useParamsTypeSafe } from "../../../utils/ReactRouter/useParamsTypeSafe";
import { useEditTodo } from "./hooks/useEditTodo";
import { useGetTodoById } from "./hooks/useGetTodoById";

const params = z.object({
  id: z.coerce.number()
})

const styles = {
  Icon: {
    marginLeft: "auto",
    width: "10%"
  },
  Paper: {
    margin: "auto",
    padding: 10,
    alignItems: "center",
    marginTop: 10,
    width: 500
  }
} as const;

function EditTodo() {
  const { id } = useParamsTypeSafe(params)
  const {
    todo,
    isLoading
  } = useGetTodoById(id)
  const inputRef = useRef<HTMLInputElement | null>(null);
  const editTodo = useEditTodo();

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (!todo) return;
    if (!inputRef.current) return;

    const text = inputRef.current.value;
    if (!text) return;

    editTodo({
      ...todo,
      text
    });
  }

  if (isLoading) return <CircularLoader />

  return (
    <Grid xs={12} item>
      <Paper elevation={2} style={styles.Paper}>
        <Box
          component="form"
          onSubmit={onSubmit}
          sx={{
            display: 'flex'
          }}
        >
          <Input
            style={{ width: "90%" }}
            defaultValue={todo?.text}
            required
            inputRef={inputRef}
          />
          <IconButton
            type="submit"
            color="primary"
            aria-label="Add"
            style={styles.Icon}
          >
            <Save fontSize="small" />
          </IconButton>
        </Box>
      </Paper>
    </Grid>
  );
}

export default EditTodo;
