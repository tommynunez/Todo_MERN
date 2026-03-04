interface H1Props {
  children: React.ReactNode;
  className?: string;
}

export const H1 = ({ children, className = "" }: H1Props) => {
  return (
    <h1
      className={`text-4xl font-bold text-gray-900 dark:text-vscode-text ${className}`}
    >
      {children}
    </h1>
  );
};
