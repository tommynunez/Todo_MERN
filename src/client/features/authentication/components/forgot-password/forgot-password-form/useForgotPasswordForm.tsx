import { useState } from 'react';
import { validateEmail } from '@/client/shared/helpers/validator';
import { useAuthorization } from '@/client/shared/hooks/useAuthorization';

export const useForgotPasswordForm = (onSuccess: () => void) => {
  const [emailAddress, setEmailAddress] = useState('');
  const [emailAddressError, setEmailAddressError] = useState(false);
  const [hasErrors, setHasErrors] = useState(false);

  const { forgotPassword, isLoading } = useAuthorization();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setHasErrors(false);
    let isError = false;

    if (!emailAddress || !validateEmail(emailAddress)) {
      setEmailAddressError(true);
      isError = true;
    }

    if (!isError) {
      const success = await forgotPassword(emailAddress);
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
    emailAddressError,
    setEmailAddressError,
    hasErrors,
    handleSubmit,
    isLoading,
  };
};
