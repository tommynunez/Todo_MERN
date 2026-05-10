import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuthorization } from '@/client/shared/hooks/useAuthorization';

export const useResetPasswordForm = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [passwordMismatchError, setPasswordMismatchError] = useState(false);
  const [hasErrors, setHasErrors] = useState(false);

  const { resetPassword, isLoading } = useAuthorization();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const validateForm = () => {
    if (!password) {
      setPasswordError(true);
      return true;
    }

    if (!confirmPassword) {
      setConfirmPasswordError(true);
      return true;
    }

    if (password && confirmPassword && password !== confirmPassword) {
      setPasswordMismatchError(true);
      return true;
    }
    return false;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setHasErrors(false);
    setPasswordMismatchError(false);

    const isError = validateForm();

    if (!isError) {
      const token = searchParams.get('token') ?? '';
      const success = await resetPassword(token, password, confirmPassword);
      if (success) {
        navigate('/login');
      } else {
        setHasErrors(true);
      }
    }
  };

  return {
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
  };
};
