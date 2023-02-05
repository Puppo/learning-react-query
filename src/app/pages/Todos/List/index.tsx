import { Box, Grid, Paper, Tab, Tabs } from "@mui/material";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { Todo } from "../../../models";
import AddTodoForm from "./components/AddTodoForm";
import List from "./components/List";

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
  const { enqueueSnackbar } = useSnackbar();
  const [currentTab, setCurrentTab] = useState<number>(0);
  const [list, setList] = useState<Todo[]>([{
    id: 1,
    text: 'Todo Example 1',
  }, {
    id: 2,
    text: 'Todo Example 2',
  }, {
    id: 3,
    text: 'Todo Example 3',
    assigneeId: 1
  }]);

  const addToList = (text: string) => {
    enqueueSnackbar('Add new Todo', {
      variant: 'success'
    })
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
          <List
            auth={auth}
            list={list}
          />
        </Grid>
      </Grid>
    </>);

}

export default ListPage;
