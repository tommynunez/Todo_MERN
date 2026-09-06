import {
  ArrowPathIcon,
  CheckBadgeIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline';
import { H1, P } from '@/client/shared';
import { Link } from 'react-router-dom';
import {
  authCardClassName,
  authInlineLinkClassName,
  authLinkClassName,
  authMutedTextClassName,
} from '@/client/features/authentication/components/shared/authStyles';
import { AuthSplitShell } from '@/client/features/authentication/components/shared/AuthSplitShell';
import { ResetPasswordForm } from './reset-password-form';

const resetPasswordHighlights = [
  {
    icon: ShieldCheckIcon,
    title: 'Protected access',
    description: 'Set a new password and keep your workspace access secure.',
  },
  {
    icon: ArrowPathIcon,
    title: 'Smooth recovery',
    description:
      'Move from the reset link back into your account without detours.',
  },
  {
    icon: CheckBadgeIcon,
    title: 'Pick up where you left off',
    description:
      'Return to your lists, assignments, and reminders with a fresh login.',
  },
] as const;

export function ResetPassword() {
  return (
    <AuthSplitShell
      heroLabel="Finish recovery"
      heroTitle="Set a new password and get back to the routines your team depends on."
      heroDescription="Choose a secure password below, then return to the same shared workspace and task history."
      heroBadges={[
        'Secure handoff',
        'Fast password updates',
        'Shared work preserved',
      ]}
      heroHighlights={resetPasswordHighlights}
      panelEyebrow="Final step"
      panelTitle="Reset password"
      panelDescription="Enter your new password below."
      footer={
        <>
          <Link to="/forgot-password" className={authLinkClassName}>
            Forgot password?
          </Link>
          <P className={authMutedTextClassName}>
            Don&apos;t have an account?{' '}
            <Link to="/signup" className={authInlineLinkClassName}>
              Sign up
            </Link>
          </P>
        </>
      }
    >
      <div
        className={`${authCardClassName} border-slate-200/80 shadow-xl shadow-slate-200/60`}
      >
        <ResetPasswordForm />
      </div>
    </AuthSplitShell>
  );
}
