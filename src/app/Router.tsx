import React from "react";
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";

import { BaseLayout } from './layout';

const ListPage = React.lazy(() => import('./pages/Todos/List'))
const EditTodoPage = React.lazy(() => import('./pages/Todos/Edit'))
const SignInPage = React.lazy(() => import('./pages/Auth/SignIn'))



const router = createBrowserRouter([
  {
    path: "/",
    element:
      <React.Suspense fallback={'Loading...'}>
        <BaseLayout>
          <ListPage />
        </BaseLayout>
      </React.Suspense>
    ,
  },
  {
    path: "/todos/:id",
    element: <React.Suspense fallback={'Loading...'}>
      <BaseLayout>
        <EditTodoPage />
      </BaseLayout>
    </React.Suspense>,
  }, {
    path: "/auth/sign-in",
    element: <React.Suspense fallback={'Loading...'}>
      <BaseLayout>
        <SignInPage />
      </BaseLayout>
    </React.Suspense>,
  },
]);



export default function () {


  return <RouterProvider router={router} />
}