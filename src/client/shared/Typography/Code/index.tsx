interface CodeProps {
  children: React.ReactNode;
  className?: string;
}

export const Code = ({ children, className = "" }: CodeProps) => {
  return (
    <code
      className={`px-2 py-1 bg-gray-100 dark:bg-vscode-input-bg text-gray-900 dark:text-vscode-blue rounded font-mono text-sm ${className}`}
    >
      {children}
    </code>
  );
};
