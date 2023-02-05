import { Save } from "@mui/icons-material";
import { Box, Grid, Paper } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Todo } from "../../../models";

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
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { id } = useParams()
  const [todo] = useState<Todo | null>(null)

  const onSubmit: React.FormEventHandler<HTMLFormElement> = () => {
    if (!inputRef.current) return;

    // TODO: update todo
  }

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
