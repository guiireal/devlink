import { createBrowserRouter } from "react-router";

import Admin from "./pages/admin";
import Home from "./pages/home";
import Login from "./pages/login";
import Networks from "./pages/networks";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/admin",
    element: <Admin />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "networks",
    element: <Networks />,
  },
]);
