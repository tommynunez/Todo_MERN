import { Outlet } from "react-router-dom";
import { AppBar, Footer } from "@/client/shared";

export const UnauthenticatedLayout = () => {
  return (
    <div className="min-h-screen flex dark:bg-vscode-bg flex-col">
      <AppBar />
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};
