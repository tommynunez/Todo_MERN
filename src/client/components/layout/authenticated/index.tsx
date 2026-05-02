export function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      Authenticated Layout
      {children}
    </div>
  );
}
