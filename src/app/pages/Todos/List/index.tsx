import { Box, Grid, Paper, Tab, Tabs } from "@mui/material";
import { useCallback, useState } from "react";
import { useUser } from "src/app/auth/useUser";
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

type Views = 'AllTodo' | 'MyTodo';

function ListPage() {
  const { user } = useUser();

  const [currentTab, setCurrentTab] = useState<Views>('AllTodo');
  const { todos: list, isLoading, isFetching, error, setUserFilter } = useTodos();
  const { addTodo } = useAddTodo();

  const addToList = useCallback((text: string) => {
    addTodo(text)
  }, [addTodo]);

  const changeView = useCallback((event: React.SyntheticEvent<Element, Event>, value: Views) => {
    const userId = value === 'MyTodo' ? user?.user.id ?? 0 : null;
    setUserFilter(userId)
    setCurrentTab(value)
  }, [user, setUserFilter])

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
          {error && <div style={{
            color: 'red'
          }}>{error}</div>}
          <List
            auth={!!user}
            list={list}
          />
          {isFetching && <div>Fetching...</div>}
          {isLoading && <div>Loading...</div>}
        </Grid>
      </Grid>
    </>);

}

export default ListPage;
