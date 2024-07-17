import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./layout/Root.jsx";
import Home from "./pages/Home/Home.jsx";
import Login from "./Authentication/Login.jsx";
import Register from "./Authentication/Register.jsx";
import AuthProvider from "./Provider/AuthProvider.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SendMoney from "./pages/role/UserRole/SendMoney.jsx";
import Private from "./Private/Private.jsx";
import Transaction from "./pages/role/Shared/Transaction.jsx";
import CashIn from "./pages/role/UserRole/CashIn.jsx";
import CashOut from "./pages/role/UserRole/CashOut.jsx";
import Balance from "./pages/role/Shared/Balance.jsx";
import TransactionManage from "./pages/role/AgentRole/TransactionManage.jsx";
// import Balance from "./pages/role/Shared/Balance.jsx";

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
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
        path: '/send-money',
        element: <Private><SendMoney /></Private>
      },
      {
        path: '/transaction',
        element: <Private><Transaction /></Private>
      },
      {
      path: '/cashin',
      element: <Private><CashIn /></Private>
      },
      {
      path: '/cashout',
      element: <Private><CashOut /></Private>
      },
      {
      path: '/balance',
      element: <Private><Balance /></Private>
      },
      // Agent

      {
        path: '/transactionmanage',
        element: <TransactionManage />
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router}></RouterProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
