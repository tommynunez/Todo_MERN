import { useState } from 'react';
import { validateEmail } from '@/client/shared/helpers/validator';
import { useAuthorization } from '@/client/shared/hooks/useAuthorization';

export const useSignupForm = (onSuccess: () => void) => {
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailAddressError, setEmailAddressError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [passwordMismatchError, setPasswordMismatchError] = useState(false);
  const [hasErrors, setHasErrors] = useState(false);

  const { signup, isLoading } = useAuthorization();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setHasErrors(false);
    setPasswordMismatchError(false);
    let isError = false;

    if (!emailAddress || !validateEmail(emailAddress)) {
      setEmailAddressError(true);
      isError = true;
    }

    if (!password) {
      setPasswordError(true);
      isError = true;
    }

    if (!confirmPassword) {
      setConfirmPasswordError(true);
      isError = true;
    }

    if (password && confirmPassword && password !== confirmPassword) {
      setPasswordMismatchError(true);
      isError = true;
    }

    if (!isError) {
      const success = await signup(emailAddress, password, confirmPassword);
      if (success) {
        onSuccess();
      } else {
        setHasErrors(true);
      }
    }
  };

  return {
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
  };
};
