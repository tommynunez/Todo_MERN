import { useState } from "react";
import { Bars3Icon, MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { useApplicationContext } from "@/client/context/ApplicationContext";

export const AppBar = () => {
  const [open, setOpen] = useState(false);
  const { isDark, toggleDarkMode } = useApplicationContext();

  return (
    <header className="w-full dark:bg-gray-900 bg-white shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <div className="text-xl font-semibold dark:text-white">Chore Mate</div>
        <nav className="hidden gap-6 text-sm font-medium text-gray-600 dark:text-gray-300 md:flex">
          <a href="#" className="hover:text-gray-900 dark:hover:text-white">
            Login
          </a>
        </nav>
        <div className="flex items-center gap-4">
          <button
            onClick={toggleDarkMode}
            className="rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {isDark ? (
              <SunIcon className="h-6 w-6 text-gray-800 dark:text-yellow-400" />
            ) : (
              <MoonIcon className="h-6 w-6 text-gray-800" />
            )}
          </button>
          <button className="md:hidden" onClick={() => setOpen(!open)}>
            <Bars3Icon className="h-6 w-6 dark:text-white" />
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {open && (
        <nav className="flex flex-col gap-4 bg-gray-50 dark:bg-gray-800 px-4 py-4 text-gray-700 dark:text-gray-300 md:hidden">
          <a href="#">Login</a>
        </nav>
      )}
    </header>
  );
};
