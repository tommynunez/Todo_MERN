interface SpanProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'primary' | 'secondary';
}

export function Span({
  children,
  className = '',
  variant = 'default',
}: SpanProps) {
  const variantClasses = {
    default: 'text-gray-900 dark:text-vscode-text',
    primary: 'text-vscode-blue dark:text-vscode-blue',
    secondary: 'text-gray-600 dark:text-vscode-text-secondary',
  };

  return (
    <span className={`${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
}
