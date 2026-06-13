import { useEffect } from 'react';
import { useSignupForm } from '@/client/features/authentication/hooks/useSignupForm';
import { clearErrorIfHasValue } from '@/client/shared/helpers/validator';
import { Input, Button } from '@/client/shared';
import { useSnackbar } from '@/client/shared/context/SnackbarContext';
import {
  authButtonClassName,
  authInputClassName,
} from '@/client/features/authentication/components/shared/authStyles';

type SignupFormProps = {
  onSuccess: () => void;
};

export function SignupForm({ onSuccess }: SignupFormProps) {
  const {
    emailAddress,
    setEmailAddress,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    emailAddressError,
    setEmailAddressError,
    passwordError,
    setPasswordError,
    confirmPasswordError,
    setConfirmPasswordError,
    passwordMismatchError,
    hasErrors,
    handleSubmit,
    isLoading,
  } = useSignupForm(onSuccess);
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    if (hasErrors) {
      showSnackbar('Sign up failed. Please try again.', { variant: 'error' });
    }
  }, [hasErrors, showSnackbar]);

  useEffect(() => {
    if (passwordMismatchError) {
      showSnackbar('Passwords do not match.', { variant: 'error' });
    }
  }, [passwordMismatchError, showSnackbar]);

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

      <Input
        type="password"
        label="Password"
        placeholder="••••••••"
        className={authInputClassName}
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          clearErrorIfHasValue(e.target.value, passwordError, setPasswordError);
        }}
        autoComplete="new-password"
        error={passwordError ? 'Please enter a password' : ''}
        required
      />

      <Input
        type="password"
        label="Confirm Password"
        placeholder="••••••••"
        className={authInputClassName}
        value={confirmPassword}
        onChange={(e) => {
          setConfirmPassword(e.target.value);
          clearErrorIfHasValue(
            e.target.value,
            confirmPasswordError,
            setConfirmPasswordError,
          );
        }}
        autoComplete="new-password"
        error={(() => {
          if (confirmPasswordError) return 'Please confirm your password';
          if (passwordMismatchError) return 'Passwords do not match';
          return '';
        })()}
        required
      />

      <Button
        type="submit"
        fullWidth
        disabled={isLoading}
        className={authButtonClassName}
      >
        {isLoading ? 'Creating account...' : 'Create Account'}
      </Button>
    </form>
  );
}
