import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import ErrorPage from "./pages/notFoundPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  makeStyles,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import Root from "./routes/Root";
import Search from "./pages/Search";
import YourLibrary from "./pages/YourLibrary";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/login",
        element: <App />,
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/your-library",
        element: <YourLibrary />,

      }
    ],
  },
  {
    path: "/login",
    element: <App />,
    errorElement: <ErrorPage />,
  }
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
