import { Link } from 'react-router-dom';
import { H1, P } from '@/client/shared';
import { usePreventBackButton } from '@hooks/usePreventBackButton';
import { Form } from './login-form';

export function Login() {
  usePreventBackButton();
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="space-y-8">
          <div className="text-center">
            <H1 className="mb-4">Login</H1>
            <P>Sign in to your Chore Mate account</P>
          </div>
          <div className="dark:bg-vscode-bg-secondary rounded-lg border border-gray-200 dark:border-vscode-border p-8">
            <Form />
          </div>
          <div className="text-center space-y-2">
            <Link
              to="/forgot-password"
              className="text-sm text-vscode-blue transition-colors hover:text-blue-600 dark:text-vscode-blue dark:hover:text-blue-400"
            >
              Forgot password?
            </Link>
            <P className="text-gray-600 dark:text-vscode-text-secondary text-sm">
              Don&apos;t have an account?{' '}
              <Link
                to="/signup"
                className="font-medium text-vscode-blue transition-colors hover:text-blue-600 dark:text-vscode-blue dark:hover:text-blue-400"
              >
                Sign up
              </Link>
            </P>
          </div>
        </div>
      </div>
    </div>
  );
}
