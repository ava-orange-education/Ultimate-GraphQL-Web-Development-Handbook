import * as React from "react";
import { createBrowserRouter } from "react-router-dom";

// Pages
import StoreFrontHomePage from "./pages/storefront/Home";
import VideoDetail from "./pages/storefront/VideoDetail";

// Login Page
import Login from "./features/Login";

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
    path: "/video/:videoId",
    element: <VideoDetail />,
  },
  {
    path: "/admin/",
    element: <AdminHome />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/admin/upload",
    element: <AdminUpload />,
  },
]);
