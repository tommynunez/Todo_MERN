import { useLoginForm } from '@/client/features/authentication/components/login/login-form/useLoginForm';
import { useEffect } from 'react';
import { clearErrorIfHasValue } from '@/client/shared/helpers/validator';
import { Input, Button } from '@/client/shared';
import { useSnackbar } from '@/client/shared/context/SnackbarContext';
import {
  authButtonClassName,
  authInputClassName,
} from '@/client/features/authentication/components/shared/authStyles';

export function Form() {
  const {
    emailAddress,
    setEmailAddress,
    password,
    setPassword,
    emailAddressError,
    setEmailAddressError,
    passwordError,
    setPasswordError,
    handleSubmit,
    hasErrors,
  } = useLoginForm();
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    if (hasErrors) {
      showSnackbar('', { variant: 'error' });
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
        autoComplete="off"
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
        autoComplete="off"
        error={passwordError ? 'Please enter your password' : ''}
        required
      />

      <Button type="submit" fullWidth className={authButtonClassName}>
        Sign In
      </Button>
    </form>
  );
}
