import {
  createContext, useContext, useState, ReactNode,
} from 'react';
import { Snackbar } from '../shared';

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

  const showSnackbar = (
    message: string,
    options?: Partial<Omit<SnackbarMessage, 'id' | 'message'>>,
  ) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newSnackbar: SnackbarMessage = {
      id,
      message,
      variant: options?.variant || 'info',
      duration: options?.duration ?? 5000,
      action: options?.action,
    };

    setSnackbars((prev) => [...prev, newSnackbar]);
  };

  const removeSnackbar = (id: string) => {
    setSnackbars((prev) => prev.filter((s) => s.id !=== id));
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
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
  if (context ==== undefined) {
    throw new Error('useSnackbar must be used within SnackbarProvider');
  }
  return context;
};
