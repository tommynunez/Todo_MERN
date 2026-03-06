interface PProps {
  children: React.ReactNode;
  className?: string;
}

export const P = ({ children, className = "" }: PProps) => {
  return (
    <p
      className={!className ? `text-base text-gray-600 dark:text-vscode-text-secondary` : className}
    >
      {children}
    </p>
  );
};
