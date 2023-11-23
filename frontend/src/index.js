import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css';
import App from './App';
import Layout from "./components/Layout";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Item from "./pages/Item";
import Sales from "./pages/Sales";
import NewItem from "./pages/NewItem";
import EditItem from "./pages/EditItem";
import DeleteItem from "./pages/DeleteItem";
import Cart from "./pages/Cart";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/item/:id",
        element: <Item />,
      },
      {
        path: "/sales",
        element: <Sales />,
      },
      {
        path: "/sales/newitem",
        element: <NewItem />,
      },
      {
        path: "/sales/edititem/:id",
        element: <EditItem />,
      },
      {
        path: "/sales/deleteitem/:id",
        element: <DeleteItem />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);



