import React, { PropsWithChildren } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider
} from "react-router-dom";

import { useUser } from "./auth/useUser";
import { BaseLayout } from './layout';
import SignUpPage from "./pages/Auth/SignUp";

const ListPage = React.lazy(() => import('./pages/Todos/List'))
const EditTodoPage = React.lazy(() => import('./pages/Todos/Edit'))
const SignInPage = React.lazy(() => import('./pages/Auth/SignIn'))

function ProtectedRoute({ children }: PropsWithChildren) {
  const { user } = useUser();
  if (!user) return <Navigate to="/auth/sign-in" replace />

  return <>{children}</>
}

const router = createBrowserRouter([
  {
    path: "/",
    element:
      <ProtectedRoute>
        <React.Suspense fallback={'Loading...'}>
          <BaseLayout>
            <ListPage />
          </BaseLayout>
        </React.Suspense>
      </ProtectedRoute>
    ,
  },
  {
    path: "/todos/:id",
    element: <ProtectedRoute>
      <React.Suspense fallback={'Loading...'}>
        <BaseLayout>
          <EditTodoPage />
        </BaseLayout>
      </React.Suspense>
    </ProtectedRoute>,
  }, {
    path: "/auth/sign-in",
    element: <React.Suspense fallback={'Loading...'}>
      <BaseLayout>
        <SignInPage />
      </BaseLayout>
    </React.Suspense>,
  }
  , {
    path: "/auth/sign-up",
    element: <React.Suspense fallback={'Loading...'}>
      <BaseLayout>
        <SignUpPage />
      </BaseLayout>
    </React.Suspense>,
  },
]);



export default function () {


  return <RouterProvider router={router} />
}