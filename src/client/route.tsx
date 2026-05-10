import { RouteObject, useRoutes } from 'react-router-dom';
import { UnauthenticatedLayout } from '@/client/shared/components/layout/unauthenticated';
import { LoginPage } from '@/client/features/authentication/pages/login';
import { ForgotPasswordPage } from '@/client/features/authentication/pages/forgot-password';
import { ResetPasswordPage } from '@/client/features/authentication/pages/reset-password';
import { EmailConfirmationPage } from '@/client/features/authentication/pages/email-confirmation';
import { HomePage } from '@/client/features/home/pages/home';

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
    element: <div />,
  },
];

export const UnauthenticatedRoutes = () => useRoutes(unauthenticatedRoutes);

export const AuthenticatedRoutes = () => useRoutes(authenticatedRoutes);
