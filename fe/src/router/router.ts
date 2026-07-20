import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";

import { routes } from "./routes";

import { lazyWrapper } from "./lazyWrapper";

const Login = lazy(() => import("../pages/Login"));
const Registration = lazy(() => import("../pages/Registration"));
const Formbuilder = lazy(() => import("../pages/Formbuilder"));

export const router = createBrowserRouter([
  {
    path: routes.client.login,
    element: lazyWrapper(Login),
  },
  {
    path: routes.client.registration,
    element: lazyWrapper(Registration),
  },
  {
    path: routes.client.root,
    element: lazyWrapper(Formbuilder),
  }
]);