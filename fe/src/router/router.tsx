import { createBrowserRouter } from "react-router-dom"
import { routes } from "./routes"

import Login from "../pages/Login"
import Registration from "../pages/Registration"
import Formbuilder from "../pages/Formbuilder"

export const router = createBrowserRouter([
  {
    path: routes.client.login,
    element: <Login />,
  },
  {
    path: routes.client.registration,
    element: <Registration />,
  },
  {
    path: routes.client.root,
    element: <Formbuilder />,
  },

    {
    path: "*",
    element: <div>NOT FOUND</div>,
  },
])