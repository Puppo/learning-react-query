import { Box, Grid, Paper, Tab, Tabs } from "@mui/material";
import { useCallback, useState } from "react";
import AddTodoForm from "./components/AddTodoForm";
import List from "./components/List";
import LoadMore from "./components/LoadMore";
import { useAddTodo } from "./hooks/useAddTodo";
import { useMyTodos } from "./hooks/useMyTodos";
import { useTodos } from "./hooks/useTodos";

const styles = {
  Paper: {
    padding: 20,
    margin: "auto",
    textAlign: "center",
    width: 500
  }
} as const;

type Views = 'AllTodo' | 'MyTodo';

function AllTodo() {
  const { todos, hasNext, next, error } = useTodos();

  return <>{error && <div style={{
    color: 'red'
  }}>{error}</div>}
    <List
      auth={true}
      list={todos}
    />
    <LoadMore
      enabled={hasNext}
      onClick={next}
    />
  </>
}

function MyTodo() {
  const { todos, error } = useMyTodos();

  return <>{error && <div style={{
    color: 'red'
  }}>{error}</div>}
    <List
      auth={true}
      list={todos}
    />
  </>
}

function ListPage() {
  const [currentTab, setCurrentTab] = useState<Views>('AllTodo');
  const { addTodo } = useAddTodo();

  const addToList = useCallback((text: string) => {
    addTodo(text)
  }, [addTodo]);

  const changeView = useCallback((event: React.SyntheticEvent<Element, Event>, value: Views) => {
    setCurrentTab(value)
  }, [])

  return (
    <>
      <Box>
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
            onChange={changeView}
            aria-label="basic tabs example">
            <Tab label="All Todo" value={'AllTodo'} />
            <Tab label="My Todo" value={'MyTodo'} />
          </Tabs>
        </Box>
      </Box>
      <Grid container spacing={0} marginTop="10px">
        <Grid item xs={12}>
          <Paper style={styles.Paper}>
            <AddTodoForm addToList={addToList} />
          </Paper>
        </Grid>
        <Grid item xs={12} style={styles.Paper}>
          {currentTab === 'AllTodo' && <AllTodo />}
          {currentTab === 'MyTodo' && <MyTodo />}
        </Grid>
      </Grid>
    </>);

}

export default ListPage;
