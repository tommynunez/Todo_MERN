import {
  BellIcon,
  CheckBadgeIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { P } from '@/client/shared';
import { usePreventBackButton } from '@/client/shared/hooks/usePreventBackButton';
import { Form } from '@/client/features/authentication/components/login/login-form';
import {
  authCardClassName,
  authInlineLinkClassName,
  authLinkClassName,
  authMutedTextClassName,
} from '@/client/features/authentication/components/shared/authStyles';
import { AuthSplitShell } from '@/client/features/authentication/components/shared/AuthSplitShell';

const loginHighlights = [
  {
    icon: BellIcon,
    title: 'Smart reminders',
    description: 'Stay on top of shared chores without chasing people down.',
  },
  {
    icon: UsersIcon,
    title: 'Real-time collaboration',
    description:
      'Keep family, friends, and coworkers aligned in one workspace.',
  },
  {
    icon: CheckBadgeIcon,
    title: 'Reliable task tracking',
    description:
      'See what is done, what is blocked, and what needs attention next.',
  },
] as const;

export function Login() {
  usePreventBackButton();

  return (
    <AuthSplitShell
      heroLabel="All-in-one task manager"
      heroTitle="Return to the workspace where your household actually stays on track."
      heroDescription="Sign in to pick up right where your lists, reminders, and shared progress left off."
      heroBadges={[
        'Smart reminders',
        'Real-time collaboration',
        'Progress you can trust',
      ]}
      heroHighlights={loginHighlights}
      panelEyebrow="Welcome back"
      panelTitle="Sign in"
      panelDescription="Access your chore lists, team updates, and recent activity."
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
        <Form />
      </div>
    </AuthSplitShell>
  );
}
