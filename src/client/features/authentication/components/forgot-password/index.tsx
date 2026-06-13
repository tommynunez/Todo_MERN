import {
  ArrowPathIcon,
  BellIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { P } from '@/client/shared';
import { ForgotPasswordForm } from '@/client/features/authentication/components/forgot-password/forgot-password-form';
import {
  authCardClassName,
  authLinkClassName,
} from '@/client/features/authentication/components/shared/authStyles';
import { AuthSplitShell } from '@/client/features/authentication/components/shared/AuthSplitShell';

const forgotPasswordHighlights = [
  {
    icon: ShieldCheckIcon,
    title: 'Secure recovery',
    description:
      'Reset access without exposing your account details to others.',
  },
  {
    icon: BellIcon,
    title: 'Email-guided steps',
    description: 'Receive a reset link with the exact next step you need.',
  },
  {
    icon: ArrowPathIcon,
    title: 'Get back quickly',
    description:
      'Recover access and return to your shared lists with minimal friction.',
  },
] as const;

export function ForgotPassword() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <AuthSplitShell
      heroLabel="Account recovery"
      heroTitle="Recover access without losing momentum on the work already in motion."
      heroDescription="Use your email address to reset your password and get back into your shared task flow."
      heroBadges={['Secure reset links', 'Quick recovery', 'Back to work fast']}
      heroHighlights={forgotPasswordHighlights}
      panelEyebrow={isSubmitted ? 'Check your inbox' : 'Need a reset?'}
      panelTitle={isSubmitted ? 'Reset link sent' : 'Forgot password'}
      panelDescription={
        isSubmitted
          ? 'Check your inbox for a password reset link.'
          : 'Enter your email and we’ll send you a reset link.'
      }
      footer={
        <Link to="/login" className={authLinkClassName}>
          Back to sign in
        </Link>
      }
    >
      {!isSubmitted ? (
        <div
          className={`${authCardClassName} border-slate-200/80 shadow-xl shadow-slate-200/60`}
        >
          <ForgotPasswordForm onSuccess={() => setIsSubmitted(true)} />
        </div>
      ) : (
        <div
          className={`${authCardClassName} border-slate-200/80 shadow-xl shadow-slate-200/60 space-y-4 text-center`}
        >
          <P className="text-slate-600">
            Follow the instructions in the email to choose a new password.
          </P>
          <Link to="/login" className={authLinkClassName}>
            Back to sign in
          </Link>
        </div>
      )}
    </AuthSplitShell>
  );
}
