import { Link } from 'react-router-dom';
import { P } from '@/client/shared';
import {
  authBodyTextClassName,
  authCardClassName,
  authLinkClassName,
} from '@/client/features/authentication/components/shared/authStyles';

export function SignupSuccess() {
  return (
    <div
      className={`${authCardClassName} space-y-4 border-slate-200/80 text-center shadow-xl shadow-slate-200/60`}
    >
      <P className={authBodyTextClassName}>
        Account created! Check your email to confirm your address before signing
        in.
      </P>
      <Link to="/login" className={`inline-block ${authLinkClassName}`}>
        Go to sign in
      </Link>
    </div>
  );
}
