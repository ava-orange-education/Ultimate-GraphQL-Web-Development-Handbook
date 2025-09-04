import * as React from "react";
import { createBrowserRouter } from "react-router-dom";

// Pages
import StoreFrontHomePage from "./pages/storefront/Home";

// Admin Login Page
import AdminLogin from "./pages/admin/Login/AdminLogin";

// Admin Upload Page
import AdminUpload from "./pages/admin/Upload/Upload";

// Admin Dashboard Page
import AdminHome from "./pages/admin/Home/Home";

export default createBrowserRouter([
  {
    path: "/",
    element: <StoreFrontHomePage />,
  },
  {
    path: "/admin/",
    element: <AdminHome />,
  },
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },
  {
    path: "/admin/upload",
    element: <AdminUpload />,
  },
]);
