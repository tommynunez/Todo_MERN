import { Outlet } from 'react-router-dom';
import { AppBar, Footer } from '@/client/shared';

export function UnauthenticatedLayout() {
  return (
    <div className="min-h-screen flex dark:bg-vscode-bg flex-col">
      <AppBar />
      <main className="flex-1 flex items-center justify-center">
        <div className="w-full">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}
