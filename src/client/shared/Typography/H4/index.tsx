interface H4Props {
  children: React.ReactNode;
  className?: string;
}

export function H4({ children, className = '' }: H4Props) {
  return (
    <h4
      className={`text-xl font-bold text-gray-900 dark:text-vscode-text ${className}`}
    >
      {children}
    </h4>
  );
}
