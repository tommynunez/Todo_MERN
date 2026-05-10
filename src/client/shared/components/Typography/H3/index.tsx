interface H3Props {
  children: React.ReactNode;
  className?: string;
}

export function H3({ children, className = '' }: H3Props) {
  return (
    <h3
      className={`text-2xl font-bold text-gray-900 dark:text-vscode-text ${className}`}
    >
      {children}
    </h3>
  );
}
