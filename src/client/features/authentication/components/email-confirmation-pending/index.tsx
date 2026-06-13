import { H1, P } from '@/client/shared';
import { authBodyTextClassName } from '@/client/features/authentication/components/shared/authStyles';

export function EmailConfirmationPending() {
  return (
    <>
      <H1 className="mb-4 text-slate-900">Confirming your email...</H1>
      <P className={authBodyTextClassName}>Please wait a moment.</P>
    </>
  );
}
