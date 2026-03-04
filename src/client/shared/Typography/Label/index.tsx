interface LabelProps {
  children: React.ReactNode;
  htmlFor?: string;
  className?: string;
  required?: boolean;
}

export const Label = ({
  children,
  htmlFor,
  className = "",
  required = false,
}: LabelProps) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`block text-sm font-medium text-gray-900 dark:text-vscode-text ${className}`}
    >
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
};
