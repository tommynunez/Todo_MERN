import { useState } from 'react';
import { Link } from 'react-router-dom';
import { H1, P } from '@/client/shared';
import { SignupForm } from './signup-form';
import { SignupSuccess } from './signup-success';

export function Signup() {
  const [isSuccess, setIsSuccess] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="space-y-8">
          <div className="text-center">
            <H1 className="mb-4">Create Account</H1>
            <P>Join Chore Mate and start managing your tasks</P>
          </div>

          {isSuccess ? (
            <SignupSuccess />
          ) : (
            <div className="dark:bg-vscode-bg-secondary rounded-lg border border-gray-200 dark:border-vscode-border p-8">
              <SignupForm onSuccess={() => setIsSuccess(true)} />
            </div>
          )}

          {!isSuccess && (
            <div className="text-center">
              <P className="text-gray-600 dark:text-vscode-text-secondary text-sm">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="font-medium text-vscode-blue transition-colors hover:text-blue-600 dark:text-vscode-blue dark:hover:text-blue-400"
                >
                  Sign in
                </Link>
              </P>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
