import { useState } from 'react';
import { validateEmail } from '@/client/helpers/validator';
import { useAuthorization } from '@/client/hooks/useAuthorization';

export const useLoginForm = () => {
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [emailAddressError, setEmailAddressError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [hasErrors, setHasErrors] = useState(false);
  const { login, isLoading } = useAuthorization();

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setHasErrors(false);
    let isError = false;

    // if email address value is empty or invalid set error flag
    if (!emailAddress || !validateEmail(emailAddress)) {
      setEmailAddressError(true);
      isError = true;
    }

    // if password value is empty set error flag
    if (!password) {
      setPasswordError(true);
      isError = true;
    }

    // send request if we have no errors
    if (!isError) {
      const response = await login(emailAddress, password);
      if (!response.success) {
        setHasErrors(true);
      }
    }
  };

  return {
    emailAddress,
    setEmailAddress,
    password,
    setPassword,
    emailAddressError,
    setEmailAddressError,
    passwordError,
    setPasswordError,
    hasErrors,
    handleSubmit,
    isLoading,
  };
};
