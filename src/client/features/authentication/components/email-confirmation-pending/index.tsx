import { H1, P } from '@/client/shared';

export function EmailConfirmationPending() {
  return (
    <>
      <H1 className="mb-4">Confirming your email...</H1>
      <P className="text-gray-500">Please wait a moment.</P>
    </>
  );
}
