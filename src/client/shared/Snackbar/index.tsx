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
  const [isEntered, setIsEntered] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setIsEntered(true));

    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (duration === 0) return;

    const timer = setTimeout(() => {
      setIsEntered(false);
      window.setTimeout(() => {
        setIsVisible(false);
        onClose?.();
      }, 200);
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
    setIsEntered(false);
    window.setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, 200);
  };

  return (
    <div
      className={`fixed ${positionClasses[position]} z-50 transform transition-all duration-200 ${isEntered ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}`}
    >
      <div
        className={`${variantClasses[variant]} flex min-w-[20rem] max-w-md items-center gap-4 rounded-lg px-6 py-3 text-white shadow-lg`}
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
