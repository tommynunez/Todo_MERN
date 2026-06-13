interface PProps {
  children: React.ReactNode;
  className?: string;
}

export function P({ children, className = '' }: PProps) {
  return <p className={`text-base ${className}`}>{children}</p>;
}
