import { Link } from 'react-router-dom';
import { P } from '@/client/shared';

export function SignupSuccess() {
  return (
    <div className="dark:bg-vscode-bg-secondary rounded-lg border border-gray-200 dark:border-vscode-border p-8 text-center space-y-4">
      <P className="text-gray-600 dark:text-vscode-text-secondary">
        Account created! Check your email to confirm your address before signing
        in.
      </P>
      <Link
        to="/login"
        className="inline-block text-sm font-medium text-vscode-blue transition-colors hover:text-blue-600 dark:text-vscode-blue dark:hover:text-blue-400"
      >
        Go to sign in
      </Link>
    </div>
  );
}
