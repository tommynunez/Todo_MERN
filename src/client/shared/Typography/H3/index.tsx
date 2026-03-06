interface H3Props {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const H3 = ({ children, className = "", style }: H3Props) => {
  return (
    <h3
      className={`text-2xl font-bold text-gray-900 dark:text-vscode-text ${className}`}
      style={style}
    >
      {children}
    </h3>
  );
};
