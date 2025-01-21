import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PageLoading from "./utils/PageLoading.jsx"
const router = createBrowserRouter([
  {
    path: "/",
    async lazy() {
      let module = await import("./students/Students.jsx");
      return { Component: module.default };
    },
  },
]);

function App() {
  return <RouterProvider fallbackElement={<PageLoading />} router={router} />;
}

export default App;