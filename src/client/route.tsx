import { RouteObject, useRoutes } from "react-router-dom";
import { HomePage } from "./pages/home";
import { UnauthenticatedLayout } from "./components/layout/unauthenticated";
import { LoginPage } from "./pages/login";
import { ForgotPasswordPage } from "./pages/forgotpassword";
import { ResetPasswordPage } from "./pages/resetpassword";
import { EmailConfirmationPage } from "./pages/emailconfirmation";

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
        element: <LoginPage />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPasswordPage />,
      },
      {
        path: "/reset-password",
        element: <ResetPasswordPage />,
      },
      {
        path: "/confirm-email",
        element: <EmailConfirmationPage />,
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
