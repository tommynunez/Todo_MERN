interface InputProps {
  type?: "text" | "email" | "password" | "number" | "tel" | "url";
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  id?: string;
}

export const Input = ({
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  label,
  required = false,
  disabled = false,
  className = "",
  id,
}: InputProps) => {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-900 dark:text-vscode-text mb-2"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full px-3 py-2 bg-white dark:bg-vscode-input-bg border border-gray-300 dark:border-vscode-border rounded-md text-gray-900 dark:text-vscode-text placeholder-gray-500 dark:placeholder-vscode-text-secondary focus:outline-none focus:ring-2 focus:ring-vscode-blue focus:border-transparent transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
          error ? "border-red-500 focus:ring-red-500" : ""
        } ${className}`}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};
