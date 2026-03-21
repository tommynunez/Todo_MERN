interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
}

export function Input({
  error,
  label,
  className = '',
  disabled = false,
  ...inputProps
}: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputProps.id} className="input-label">
          {label}
          {inputProps.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        {...inputProps}
        disabled={disabled}
        className={`input-field ${
          error ? 'border-red-500 focus:ring-red-500' : ''
        } ${className}`}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
