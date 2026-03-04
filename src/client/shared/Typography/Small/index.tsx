interface SmallProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "muted" | "error";
}

export const Small = ({
  children,
  className = "",
  variant = "default",
}: SmallProps) => {
  const variantClasses = {
    default: "text-gray-600 dark:text-vscode-text-secondary",
    muted: "text-gray-500 dark:text-vscode-text-secondary opacity-75",
    error: "text-red-500",
  };

  return (
    <small className={`text-xs ${variantClasses[variant]} ${className}`}>
      {children}
    </small>
  );
};
