import { RouteObject, useRoutes } from 'react-router-dom';
import { UnauthenticatedLayout } from '@/client/shared/components/layout/unauthenticated';
import { LoginPage } from '@/client/features/authentication/pages/Login';
import { ForgotPasswordPage } from '@/client/features/authentication/pages/ForgotPassword';
import { ResetPasswordPage } from '@/client/features/authentication/pages/ResetPassword';
import { EmailConfirmationPage } from '@/client/features/authentication/pages/EmailConfirmation';
import { HomePage } from '@/client/features/home/pages/home';
import { SignUp } from '@/client/features/authentication/pages/Signup';

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
      {
        path: '/signup',
        element: <SignUp />,
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
