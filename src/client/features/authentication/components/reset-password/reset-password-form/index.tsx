import { useEffect } from 'react';
import { useResetPasswordForm } from '@/client/features/authentication/hooks/useResetPasswordForm';
import { clearErrorIfHasValue } from '@/client/shared/helpers/validator';
import { Input, Button } from '@/client/shared';
import { useSnackbar } from '@/client/shared/context/SnackbarContext';
import {
  authButtonClassName,
  authInputClassName,
} from '@/client/features/authentication/components/shared/authStyles';

export function ResetPasswordForm() {
  const {
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    passwordError,
    setPasswordError,
    confirmPasswordError,
    setConfirmPasswordError,
    passwordMismatchError,
    hasErrors,
    handleSubmit,
    isLoading,
  } = useResetPasswordForm();
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    if (hasErrors) {
      showSnackbar('Password reset failed. Please try again.', {
        variant: 'error',
      });
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
        type="password"
        label="New Password"
        placeholder="••••••••"
        className={authInputClassName}
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          clearErrorIfHasValue(e.target.value, passwordError, setPasswordError);
        }}
        autoComplete="new-password"
        error={passwordError ? 'Please enter a new password' : ''}
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
        {isLoading ? 'Resetting...' : 'Reset Password'}
      </Button>
    </form>
  );
}
