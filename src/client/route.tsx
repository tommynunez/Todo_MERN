import { RouteObject, useRoutes } from "react-router-dom";
import { HomePage } from "./pages/home";
import { UnauthenticatedLayout } from "./components/layout/unauthenticated";

const unauthenticatedRoutes: RouteObject[] = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    element: <UnauthenticatedLayout />,
    children: [
      {
        path: "/login",
        element: <></>,
      },
      {
        path: "/signup",
        element: <></>,
      },
      {
        path: "/forgot-password",
        element: <></>,
      },
      {
        path: "/reset-password",
        element: <></>,
      },
      {
        path: "/confirm-email",
        element: <></>,
      },
    ],
  },
];

const authenticatedRoutes: RouteObject[] = [
  {
    path: "/dashboard",
    element: <></>,
  },
];

export const UnauthenticatedRoutes = () => {
  return useRoutes(unauthenticatedRoutes);
};

export const AuthenticatedRoutes = () => {
  return useRoutes(authenticatedRoutes);
};
