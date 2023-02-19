import { Box, Grid, Paper, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import AddTodoForm from "./components/AddTodoForm";
import List from "./components/List";
import { useAddTodo } from "./hooks/useAddTodo";
import { useTodos } from "./hooks/useTodos";

const styles = {
  Paper: {
    padding: 20,
    margin: "auto",
    textAlign: "center",
    width: 500
  }
} as const;

function ListPage() {
  const auth = true;

  const [currentTab, setCurrentTab] = useState<number>(0);
  const { todos: list, isLoading, isFetching, error } = useTodos();
  const { addTodo } = useAddTodo();

  const addToList = (text: string) => {
    addTodo(text)
  };




  return (
    <>
      {auth && <Box>
        <Box
          sx={{
            display: 'flex',
            margin: "auto",
            marginTop: '10px',
            width: 500,
            borderBottom: 1,
            borderColor: 'divider',
          }}>
          <Tabs
            sx={{
              margin: 'auto'
            }}
            value={currentTab}
            onChange={(_, newValue) => {
              setCurrentTab(newValue)
            }}
            aria-label="basic tabs example">
            <Tab label="All Todo" />
            <Tab label="My Todo" />
          </Tabs>
        </Box>
      </Box>}
      <Grid container spacing={0} marginTop="10px">
        <Grid item xs={12}>
          <Paper style={styles.Paper}>
            <AddTodoForm addToList={addToList} />
          </Paper>
        </Grid>
        <Grid item xs={12} style={styles.Paper}>
          {error && <div style={{
            color: 'red'
          }}>{error}</div>}
          <List
            auth={auth}
            list={list}
          />
          {isFetching && <div>Fetching...</div>}
          {isLoading && <div>Loading...</div>}
        </Grid>
      </Grid>
    </>);

}

export default ListPage;
