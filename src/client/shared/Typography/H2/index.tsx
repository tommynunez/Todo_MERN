interface H2Props {
  children: React.ReactNode;
  className?: string;
}

export const H2 = ({ children, className = "" }: H2Props) => {
  return (
    <h2
      className={`text-3xl font-bold text-gray-900 dark:text-vscode-text ${className}`}
    >
      {children}
    </h2>
  );
};
