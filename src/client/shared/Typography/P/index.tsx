interface PProps {
  children: React.ReactNode;
  className?: string;
}

export function P({ children, className = '' }: PProps) {
  return (
    <p
      className={`text-base text-gray-600 dark:text-vscode-text-secondary ${className}`}
    >
      {children}
    </p>
  );
}
