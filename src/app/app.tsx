import { QueryClientProvider } from '@tanstack/react-query';
import { SnackbarProvider } from 'notistack';
import React from "react";
import { Loader } from './components';
import { queryClient } from './react-query/client';
import Router from './Router';

function App() {

  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <SnackbarProvider maxSnack={3}>
          <Loader />
          <Router />
        </SnackbarProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );

}

export default App;
