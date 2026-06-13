import { useEmailConfirmation } from '@/client/features/authentication/hooks/useEmailConfirmation';
import { EmailConfirmationPending } from '@/client/features/authentication/components/email-confirmation/email-confirmation-pending';
import { EmailConfirmationSuccess } from '@/client/features/authentication/components/email-confirmation/email-confirmation-success';
import { EmailConfirmationError } from '@/client/features/authentication/components/email-confirmation/email-confirmation-error';
import {
  authCardClassName,
} from '@/client/features/authentication/components/shared/authStyles';
import { AuthShell } from '@/client/features/authentication/components/shared/AuthShell';

export function EmailConfirmation() {
  const { status } = useEmailConfirmation();

  return (
    <AuthShell>
      <div className={`${authCardClassName} space-y-6 text-center`}>
        {status === 'pending' && <EmailConfirmationPending />}
        {status === 'success' && <EmailConfirmationSuccess />}
        {status === 'error' && <EmailConfirmationError />}
      </div>
    </AuthShell>
  );
}
