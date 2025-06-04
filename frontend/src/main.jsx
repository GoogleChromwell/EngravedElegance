import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/HomePage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import NotFoundError from "./components/RouterErrors/NotFoundError.jsx";
import Register from "./components/Authentication/Register.jsx";
import Cart from "./pages/Cart.jsx";
import Staff from "./pages/Staff.jsx";
import { UserProvider } from "./components/Authentication/UserContext.jsx";
import ProtectedRoute from "./components/Authentication/ProtectedRoute.jsx";
import EditFunction from "./components/Tables/EditFunction.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <NotFoundError />,
  },
    {
    path: "/Edit",
    element: <EditFunction/>,
  },
  {
    path: "/Dashboard",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/Cart",
    element:(
      <ProtectedRoute allowedRoles={["staff"]}>
        <Cart/>
      </ProtectedRoute>
    ),
  },
  {
    path: "/Register",
    element:(
      <ProtectedRoute allowedRoles={["admin"]}>
        <Register/>
      </ProtectedRoute>
    ),
  },
  {
    path: "/Staff",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <Staff />
      </ProtectedRoute>
    ),
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </StrictMode>
);
