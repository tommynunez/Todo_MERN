import { Link } from 'react-router-dom';
import { H1, P } from '@/client/shared';
import {
  authBodyTextClassName,
  authLinkClassName,
} from '@/client/features/authentication/components/shared/authStyles';

export function EmailConfirmationSuccess() {
  return (
    <>
      <H1 className="mb-4 text-slate-900">Email Confirmed</H1>
      <P className={authBodyTextClassName}>
        Your email has been confirmed. You can now sign in.
      </P>
      <Link to="/login" className={`inline-block ${authLinkClassName}`}>
        Go to sign in
      </Link>
    </>
  );
}
