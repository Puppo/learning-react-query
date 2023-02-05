import { SnackbarProvider } from 'notistack';
import React from "react";
import Router from './Router';

function App() {

  return (
    <React.StrictMode>
      <SnackbarProvider maxSnack={3}>
        <Router />
      </SnackbarProvider>
    </React.StrictMode>
  );

}

export default App;
