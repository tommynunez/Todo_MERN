import { Link } from 'react-router-dom';
import { H1, P } from '@/client/shared';
import { usePreventBackButton } from '@/client/shared/hooks/usePreventBackButton';
import { Form } from '@/client/features/authentication/components/login/login-form';
import {
  authBodyTextClassName,
  authCardClassName,
  authInlineLinkClassName,
  authLinkClassName,
  authMutedTextClassName,
} from '@/client/features/authentication/components/shared/authStyles';
import { AuthShell } from '@/client/features/authentication/components/shared/AuthShell';

export function Login() {
  usePreventBackButton();
  return (
    <AuthShell>
      <div className="space-y-8">
        <div className="text-center">
          <H1 className="mb-4 text-slate-900">Login</H1>
          <P className={authBodyTextClassName}>
            Sign in to your Chore Mate account
          </P>
        </div>

        <div className={authCardClassName}>
          <Form />
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
