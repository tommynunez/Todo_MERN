import { useState } from 'react';
import { Link } from 'react-router-dom';
import { H1, P } from '@/client/shared';
import { ForgotPasswordForm } from '@/client/features/authentication/components/forgot-password/forgot-password-form';
import {
  authBodyTextClassName,
  authCardClassName,
  authLinkClassName,
} from '@/client/features/authentication/components/shared/authStyles';
import { AuthShell } from '@/client/features/authentication/components/shared/AuthShell';

export function ForgotPassword() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <AuthShell>
      <div className="space-y-8">
        <div className="text-center">
          <H1 className="mb-4 text-slate-900">Forgot Password</H1>
          <P className={authBodyTextClassName}>
            {isSubmitted
              ? 'Check your inbox for a password reset link.'
              : 'Enter your email and we’ll send you a reset link.'}
          </P>
        </div>

        {!isSubmitted && (
          <div className={authCardClassName}>
            <ForgotPasswordForm onSuccess={() => setIsSubmitted(true)} />
          </div>
        )}

        <div className="text-center">
          <Link to="/login" className={authLinkClassName}>
            Back to sign in
          </Link>
        </div>
      </div>
    </AuthShell>
  );
}
