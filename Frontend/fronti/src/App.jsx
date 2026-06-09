import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router.jsx";
import { AuthProvider } from "./features/auth/context/AuthContext.jsx";
import { PostContextProvider } from "./features/post/context/PostContext.jsx";

const App = () => {
  return (
    <div>
      <PostContextProvider>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </PostContextProvider>
    </div>
  );
};

export default App;
