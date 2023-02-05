import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { Box } from "@mui/system";
import React, { useCallback, useRef } from "react";

interface AddTodoFormProps {
  addToList: (text: string) => void;
}

function AddTodoForm({ addToList }: AddTodoFormProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const errorRef = useRef<HTMLParagraphElement | null>(null);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = useCallback((e) => {
    e.preventDefault();
    if (!inputRef.current) return;
    if (!errorRef.current) return;
    if (inputRef.current.value === "") {
      errorRef.current.classList.add("active");
      return null;
    }
    errorRef.current.classList.remove("active");
    addToList(inputRef.current.value);
    e.currentTarget.reset();
  }, [inputRef, errorRef, addToList]);

  return (
    <Box component="form" onSubmit={handleSubmit} style={{ display: "flex", flexFlow: 'column' }}>
      <Box width="100%" sx={{
        display: 'flex',
        flexFlow: 'row'
      }}>
        <TextField
          placeholder="Todo"
          inputProps={{
            "aria-label": "Description"
          }}
          style={{
            width: '90%',
          }}
          autoComplete="off"
          inputRef={inputRef}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ width: "10%" }}
        >
          Add
        </Button>
      </Box>

      <Box>
        <p ref={errorRef} className="error">
          Error, must enter a value!
        </p>
      </Box>
    </Box>
  );
}

export default AddTodoForm