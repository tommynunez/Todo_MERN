import { useEffect } from 'react';
import { useForgotPasswordForm } from '@/client/features/authentication/hooks/useForgotPasswordForm';
import { clearErrorIfHasValue } from '@/client/shared/helpers/validator';
import { Input, Button } from '@/client/shared';
import { useSnackbar } from '@/client/shared/context/SnackbarContext';
import {
  authButtonClassName,
  authInputClassName,
} from '@/client/features/authentication/components/shared/authStyles';

type ForgotPasswordFormProps = {
  onSuccess: () => void;
};

export function ForgotPasswordForm({ onSuccess }: ForgotPasswordFormProps) {
  const {
    emailAddress,
    setEmailAddress,
    emailAddressError,
    setEmailAddressError,
    hasErrors,
    handleSubmit,
    isLoading,
  } = useForgotPasswordForm(onSuccess);
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    if (hasErrors) {
      showSnackbar('Something went wrong. Please try again.', {
        variant: 'error',
      });
    }
  }, [hasErrors, showSnackbar]);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="email"
        label="Email Address"
        placeholder="your@email.com"
        className={authInputClassName}
        value={emailAddress}
        onChange={(e) => {
          setEmailAddress(e.target.value);
          clearErrorIfHasValue(
            e.target.value,
            emailAddressError,
            setEmailAddressError,
          );
        }}
        autoComplete="email"
        error={emailAddressError ? 'Please enter a valid email address' : ''}
        required
      />

      <Button
        type="submit"
        fullWidth
        disabled={isLoading}
        className={authButtonClassName}
      >
        {isLoading ? 'Sending...' : 'Send Reset Link'}
      </Button>
    </form>
  );
}
