import type { ReactNode } from 'react';

type AuthShellProps = {
  children: ReactNode;
  widthClassName?: string;
};

export function AuthShell({
  children,
  widthClassName = 'max-w-lg',
}: AuthShellProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-indigo-100/60 px-4 py-12">
      <div className="mx-auto flex min-h-[calc(100vh-6rem)] w-full items-center justify-center">
        <div className={`w-full ${widthClassName}`}>{children}</div>
      </div>
    </div>
  );
}
