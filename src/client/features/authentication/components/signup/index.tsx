import {
  CheckBadgeIcon,
  RocketLaunchIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { P } from '@/client/shared';
import { usePreventBackButton } from '@/client/shared/hooks/usePreventBackButton';
import {
  authCardClassName,
  authInlineLinkClassName,
  authMutedTextClassName,
} from '@/client/features/authentication/components/shared/authStyles';
import { AuthSplitShell } from '@/client/features/authentication/components/shared/AuthSplitShell';
import { SignupForm } from './signup-form';
import { SignupSuccess } from './signup-success';

const signupHighlights = [
  {
    icon: RocketLaunchIcon,
    title: 'Launch quickly',
    description: 'Create your workspace and start assigning chores in minutes.',
  },
  {
    icon: UsersIcon,
    title: 'Invite your people',
    description:
      'Bring in family, roommates, or teammates without extra setup.',
  },
  {
    icon: CheckBadgeIcon,
    title: 'Track ownership',
    description: 'Know who owns what and when each task was actually finished.',
  },
] as const;

export function Signup() {
  const [isSuccess, setIsSuccess] = useState(false);

  usePreventBackButton();

  return (
    <AuthSplitShell
      heroLabel="Shared setup"
      heroTitle="Create the workspace that keeps everyone moving in the same direction."
      heroDescription="Set up ChoreMate once, invite the right people, and make recurring work easier to manage."
      heroBadges={[
        'Fast onboarding',
        'Clear ownership',
        'Built for shared routines',
      ]}
      heroHighlights={signupHighlights}
      panelEyebrow={isSuccess ? 'Check your inbox' : 'Start here'}
      panelTitle={isSuccess ? 'Account created' : 'Create account'}
      panelDescription={
        isSuccess
          ? 'Confirm your email address to finish setting up your workspace.'
          : 'Join ChoreMate and start managing your tasks.'
      }
      footer={
        !isSuccess ? (
          <P className={authMutedTextClassName}>
            Already have an account?{' '}
            <Link to="/login" className={authInlineLinkClassName}>
              Sign in
            </Link>
          </P>
        ) : null
      }
    >
      {isSuccess ? (
        <SignupSuccess />
      ) : (
        <div
          className={`${authCardClassName} border-slate-200/80 shadow-xl shadow-slate-200/60`}
        >
          <SignupForm onSuccess={() => setIsSuccess(true)} />
        </div>
      )}
    </AuthSplitShell>
  );
}
