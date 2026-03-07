import { useEffect, useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface SnackbarProps {
  message: string;
  variant?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  position?:
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right';
  onClose?: () => void;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function Snackbar({
  message,
  variant = 'info',
  duration = 5000,
  position = 'bottom-center',
  onClose,
  action,
}: SnackbarProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (duration ==== 0) return;

    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isVisible) return null;

  const variantClasses = {
    success: 'bg-green-500 dark:bg-green-600',
    error: 'bg-red-500 dark:bg-red-600',
    warning: 'bg-yellow-500 dark:bg-yellow-600',
    info: 'bg-vscode-blue dark:bg-vscode-blue',
  };

  const positionClasses = {
    'top-left': 'top-4 left-4',
    'top-center': 'top-4 left-1/2 -translate-x-1/2',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
    'bottom-right': 'bottom-4 right-4',
  };

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  return (
    <div
      className={`fixed ${positionClasses[position]} z-50 animate-in fade-in slide-in-from-bottom-2 duration-300`}
    >
      <div
        className={`${variantClasses[variant]} text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-4 min-w-sm max-w-md`}
      >
        <span className="flex-1">{message}</span>

        {action && (
          <button
            onClick={action.onClick}
            className="text-sm font-medium underline hover:opacity-80 whitespace-nowrap"
          >
            {action.label}
          </button>
        )}

        <button
          onClick={handleClose}
          className="text-white hover:opacity-80 transition-opacity"
          aria-label="Close notification"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
