import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./features/auth/context/AuthContext.jsx";
import { PostContextProvider } from "./features/post/context/PostContext.jsx";

createRoot(document.getElementById("root")).render(
    <PostContextProvider>
  <AuthProvider>
    <App />
  </AuthProvider>,
  </PostContextProvider>
);
