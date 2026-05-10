import { Link } from 'react-router-dom';
import { H1, P } from '@/client/shared';

export function EmailConfirmationSuccess() {
  return (
    <>
      <H1 className="mb-4">Email Confirmed</H1>
      <P className="text-gray-600 dark:text-vscode-text-secondary">
        Your email has been confirmed. You can now sign in.
      </P>
      <Link
        to="/login"
        className="inline-block text-sm font-medium text-vscode-blue transition-colors hover:text-blue-600 dark:text-vscode-blue dark:hover:text-blue-400"
      >
        Go to sign in
      </Link>
    </>
  );
}
