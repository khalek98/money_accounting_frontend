import { createBrowserRouter } from "react-router-dom";

import App from "./App";
import SignIn from "./pages/auth/signin";
import SignUp from "./pages/auth/signup";
import ConfirmedEmail from "./pages/auth/confirmed";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/auth/signin",
    element: <SignIn />,
  },
  {
    path: "/auth/signup",
    element: <SignUp />,
  },
  {
    path: "/auth/confirmed",
    element: <ConfirmedEmail />,
  },
]);
