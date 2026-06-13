import { useState } from 'react';
import { Link } from 'react-router-dom';
import { H1, P } from '@/client/shared';
import {
  authBodyTextClassName,
  authCardClassName,
  authInlineLinkClassName,
  authMutedTextClassName,
} from '@/client/features/authentication/components/shared/authStyles';
import { AuthShell } from '@/client/features/authentication/components/shared/AuthShell';
import { SignupForm } from './signup-form';
import { SignupSuccess } from './signup-success';

export function Signup() {
  const [isSuccess, setIsSuccess] = useState(false);

  return (
    <AuthShell>
      <div className="space-y-8">
        <div className="text-center">
          <H1 className="mb-4 text-slate-900">Create Account</H1>
          <P className={authBodyTextClassName}>
            Join Chore Mate and start managing your tasks
          </P>
        </div>

        {isSuccess ? (
          <SignupSuccess />
        ) : (
          <div className={authCardClassName}>
            <SignupForm onSuccess={() => setIsSuccess(true)} />
          </div>
        )}

        {!isSuccess && (
          <div className="text-center">
            <P className={authMutedTextClassName}>
              Already have an account?{' '}
              <Link to="/login" className={authInlineLinkClassName}>
                Sign in
              </Link>
            </P>
          </div>
        )}
      </div>
    </AuthShell>
  );
}
