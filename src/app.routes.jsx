import { createBrowserRouter } from "react-router";
import Login from "./auth/pages/Login";
import Register from "./auth/pages/Register";
import Home from "./auth/pages/Home";
import Protected from "./auth/components/Protected";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: (
      <Protected>
        <Home />
      </Protected>
    ),
  },
]);
