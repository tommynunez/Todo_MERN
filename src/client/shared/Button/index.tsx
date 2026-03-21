interface ButtonProps {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  fullWidth?: boolean;
  style?: React.CSSProperties;
  unstyled?: boolean;
}

export function Button({
  children,
  type = 'button',
  onClick,
  disabled = false,
  variant = 'primary',
  size = 'md',
  className = '',
  fullWidth = false,
  style,
  unstyled = false,
}: ButtonProps) {
  const variantClasses = {
    primary:
      'bg-vscode-blue hover:opacity-90 active:opacity-75 text-white disabled:opacity-50',
    secondary:
      'bg-gray-200 dark:bg-vscode-border hover:bg-gray-300 dark:hover:bg-vscode-input-bg text-gray-900 dark:text-vscode-text disabled:opacity-50',
    danger:
      'bg-red-500 hover:bg-red-600 active:bg-red-700 text-white disabled:opacity-50',
  };

  const sizeClasses = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
  };

  const widthClass = fullWidth ? 'w-full' : '';
  const baseClass =
    'font-medium rounded-md transition-opacity duration-200 disabled:cursor-not-allowed';
  const variantClass = unstyled ? '' : variantClasses[variant];
  const sizeClass = unstyled ? '' : sizeClasses[size];
  const computedClass =
    `${baseClass} ${widthClass} ${variantClass} ${sizeClass} ${className}`.trim();

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={computedClass}
      style={style}
    >
      {children}
    </button>
  );
}
