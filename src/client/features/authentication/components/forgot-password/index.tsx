import { useState } from 'react';
import { Link } from 'react-router-dom';
import { H1, P } from '@/client/shared';
import { ForgotPasswordForm } from '@/client/features/authentication/components/forgot-password/forgot-password-form';

export function ForgotPassword() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="space-y-8">
          <div className="text-center">
            <H1 className="mb-4">Forgot Password</H1>
            <P>
              {isSubmitted
                ? 'Check your inbox for a password reset link.'
                : 'Enter your email and we\u2019ll send you a reset link.'}
            </P>
          </div>

          {!isSubmitted && (
            <div className="dark:bg-vscode-bg-secondary rounded-lg border border-gray-200 dark:border-vscode-border p-8">
              <ForgotPasswordForm onSuccess={() => setIsSubmitted(true)} />
            </div>
          )}

          <div className="text-center">
            <Link
              to="/login"
              className="text-sm text-vscode-blue transition-colors hover:text-blue-600 dark:text-vscode-blue dark:hover:text-blue-400"
            >
              Back to sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
