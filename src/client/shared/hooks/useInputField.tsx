import { useState } from 'react';

export const useInputField = () => {
  const [value, setValue] = useState('');
  const [isError, setIsError] = useState(false);
  const STORAGE_REMEMBER_ME = 'rememberMe';

  const handleInputOnBlur = (
    event: React.FocusEvent<HTMLInputElement>,
    storage: Storage,
    isError: boolean,
    setIsError: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    if (event.target.value) {
      if (storage.exists(STORAGE_REMEMBER_ME)) {
        storage.encryptPropValue(
          STORAGE_REMEMBER_ME,
          event.target.name,
          event.target.value,
        );
      }

      // if we have a value and error flag is on turn if off
      if (isError) {
        setIsError(false);
      }
    } else {
      setIsError(true);
    }
  };

  return [value, setValue, isError, setIsError, handleInputOnBlur] as const;
};
