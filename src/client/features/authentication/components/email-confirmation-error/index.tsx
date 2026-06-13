import { Link } from 'react-router-dom';
import { H1, P } from '@/client/shared';
import {
  authBodyTextClassName,
  authLinkClassName,
} from '@/client/features/authentication/components/shared/authStyles';

export function EmailConfirmationError() {
  return (
    <>
      <H1 className="mb-4 text-slate-900">Confirmation Failed</H1>
      <P className={authBodyTextClassName}>
        The link is invalid or has expired. Please request a new confirmation
        email.
      </P>
      <Link to="/login" className={`inline-block ${authLinkClassName}`}>
        Back to sign in
      </Link>
    </>
  );
}
