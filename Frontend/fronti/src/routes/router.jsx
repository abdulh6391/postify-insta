import { createBrowserRouter } from "react-router-dom";
import Login from "../features/auth/pages/Login.jsx";
import Register from "../features/auth/pages/Register.jsx";
import Feed from "../features/post/pages/Feed.jsx";
import CreatePost from "../features/post/pages/CreatePost.jsx";

export const router = createBrowserRouter([
  {
    path: "/w",
    element: <h1>Welcome</h1>,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/feed",
    element: <Feed />,
  },
  {
    path: "/create",
    element: <CreatePost />,
  },
]);
