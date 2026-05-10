import { useContext } from 'react';
import { AuthorizationContext } from '@/client/shared/context/AuthorizationContext';

export const useAuthorization = () => {
  const context = useContext(AuthorizationContext);
  if (!context) {
    throw new Error(
      'useAuthorization must be used within an AuthorizationProvider',
    );
  }
  return context;
};
