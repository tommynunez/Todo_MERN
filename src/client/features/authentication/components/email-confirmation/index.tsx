import { useEmailConfirmation } from '@/client/features/authentication/hooks/useEmailConfirmation';
import { EmailConfirmationPending } from '@/client/features/authentication/components/email-confirmation-pending';
import { EmailConfirmationSuccess } from '@/client/features/authentication/components/email-confirmation-success';
import { EmailConfirmationError } from '@/client/features/authentication/components/email-confirmation-error';

export function EmailConfirmation() {
  const { status } = useEmailConfirmation();

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md text-center">
        <div className="space-y-8">
          {status === 'pending' && <EmailConfirmationPending />}
          {status === 'success' && <EmailConfirmationSuccess />}
          {status === 'error' && <EmailConfirmationError />}
        </div>
      </div>
    </div>
  );
}
