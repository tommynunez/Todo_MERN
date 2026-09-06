import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  ReactNode,
} from 'react';
import { Snackbar } from '@/client/shared/components/Snackbar';

interface SnackbarMessage {
  id: string;
  message: string;
  variant: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface SnackbarContextType {
  showSnackbar: (
    message: string,
    options?: Partial<Omit<SnackbarMessage, 'id' | 'message'>>,
  ) => void;
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined,
);

export function SnackbarProvider({ children }: { children: ReactNode }) {
  const [snackbars, setSnackbars] = useState<SnackbarMessage[]>([]);

  const showSnackbar = useCallback(
    (
      message: string,
      options?: Partial<Omit<SnackbarMessage, 'id' | 'message'>>,
    ) => {
      const id = Math.random().toString(36).slice(2, 11);
      const newSnackbar: SnackbarMessage = {
        id,
        message,
        variant: options?.variant || 'info',
        duration: options?.duration ?? 5000,
        action: options?.action,
      };

      setSnackbars((prev) => [...prev, newSnackbar]);
    },
    [],
  );

  const removeSnackbar = useCallback((id: string) => {
    setSnackbars((prev) => prev.filter((s) => s.id !== id));
  }, []);

  const contextValue = useMemo(() => ({ showSnackbar }), [showSnackbar]);

  return (
    <SnackbarContext.Provider value={contextValue}>
      {children}
      <div className="fixed top-4 right-4 flex flex-col gap-2 pointer-events-auto z-50">
        {snackbars.map((snackbar) => (
          <Snackbar
            key={snackbar.id}
            message={snackbar.message}
            variant={snackbar.variant}
            duration={snackbar.duration}
            onClose={() => removeSnackbar(snackbar.id)}
            action={snackbar.action}
          />
        ))}
      </div>
    </SnackbarContext.Provider>
  );
}

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (context === undefined) {
    throw new Error('useSnackbar must be used within SnackbarProvider');
  }
  return context;
};
