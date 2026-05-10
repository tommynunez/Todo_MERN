import { Link } from 'react-router-dom';
import { H1, P } from '@/client/shared';

export function EmailConfirmationError() {
  return (
    <>
      <H1 className="mb-4">Confirmation Failed</H1>
      <P className="text-gray-600 dark:text-vscode-text-secondary">
        The link is invalid or has expired. Please request a new confirmation
        email.
      </P>
      <Link
        to="/login"
        className="inline-block text-sm font-medium text-vscode-blue transition-colors hover:text-blue-600 dark:text-vscode-blue dark:hover:text-blue-400"
      >
        Back to sign in
      </Link>
    </>
  );
}
