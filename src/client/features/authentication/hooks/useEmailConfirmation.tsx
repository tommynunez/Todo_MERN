import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuthorization } from '@/client/shared/hooks/useAuthorization';

type ConfirmationStatus = 'pending' | 'success' | 'error';

export const useEmailConfirmation = () => {
  const [status, setStatus] = useState<ConfirmationStatus>('pending');
  const [searchParams] = useSearchParams();
  const { confirmEmail } = useAuthorization();

  useEffect(() => {
    const token = searchParams.get('token');

    if (!token) {
      setStatus('error');
      return;
    }

    confirmEmail(token).then((success) => {
      setStatus(success ? 'success' : 'error');
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return { status };
};
