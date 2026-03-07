import { RouteObject, useRoutes } from 'react-router-dom';
import { UnauthenticatedLayout } from '@components/layout/unauthenticated';
import { LoginPage } from '@pages/login';
import { ForgotPasswordPage } from '@pages/forgot-password';
import { ResetPasswordPage } from '@pages/reset-password';
import { EmailConfirmationPage } from '@pages/email-confirmation';
import { HomePage } from './pages/home';

const unauthenticatedRoutes: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    element: <UnauthenticatedLayout />,
    children: [
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/forgot-password',
        element: <ForgotPasswordPage />,
      },
      {
        path: '/reset-password',
        element: <ResetPasswordPage />,
      },
      {
        path: '/confirm-email',
        element: <EmailConfirmationPage />,
      },
    ],
  },
];

const authenticatedRoutes: RouteObject[] = [
  {
    path: '/dashboard',
    element: <></>,
  },
];

export const UnauthenticatedRoutes = () => useRoutes(unauthenticatedRoutes);

export const AuthenticatedRoutes = () => useRoutes(authenticatedRoutes);
