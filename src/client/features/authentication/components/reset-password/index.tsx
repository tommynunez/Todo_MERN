import { H1, P } from '@/client/shared';
import { Link } from 'react-router-dom';
import {
  authBodyTextClassName,
  authCardClassName,
  authInlineLinkClassName,
  authLinkClassName,
  authMutedTextClassName,
} from '@/client/features/authentication/components/shared/authStyles';
import { AuthShell } from '@/client/features/authentication/components/shared/AuthShell';
import { ResetPasswordForm } from './reset-password-form';

export function ResetPassword() {
  return (
    <AuthShell>
      <div className="space-y-8">
        <div className="text-center">
          <H1 className="mb-4 text-slate-900">Reset Password</H1>
          <P className={authBodyTextClassName}>Enter your new password below</P>
        </div>

        <div className={authCardClassName}>
          <ResetPasswordForm />
        </div>

        <div className="space-y-2 text-center">
          <Link to="/forgot-password" className={authLinkClassName}>
            Forgot password?
          </Link>
          <P className={authMutedTextClassName}>
            Don&apos;t have an account?{' '}
            <Link to="/signup" className={authInlineLinkClassName}>
              Sign up
            </Link>
          </P>
        </div>
      </div>
    </AuthShell>
  );
}
