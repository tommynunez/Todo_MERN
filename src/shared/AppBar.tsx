import { useState } from "react";
import { Bars3Icon, MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { useApplicationContext } from "@/client/context/ApplicationContext";

export const AppBar = () => {
  const [open, setOpen] = useState(false);
  const { isDark, toggleDarkMode } = useApplicationContext();

  return (
    <header className="w-full bg-white dark:bg-ms-dark-900 border-b border-gray-200 dark:border-ms-dark-700 shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <div className="text-xl font-semibold text-gray-900 dark:text-white">
          Chore Mate
        </div>
        <nav className="hidden gap-6 text-sm font-medium text-gray-600 dark:text-ms-dark-200 md:flex">
          <a
            href="#"
            className="hover:text-ms-blue-500 dark:hover:text-ms-blue-500 transition-colors"
          >
            Login
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleDarkMode}
            className="rounded p-2 hover:bg-gray-100 dark:hover:bg-ms-dark-700 transition-colors"
          >
            {isDark ? (
              <SunIcon className="h-5 w-5 text-ms-dark-200" />
            ) : (
              <MoonIcon className="h-5 w-5 text-gray-800" />
            )}
          </button>
          <button
            className="rounded p-2 hover:bg-gray-100 dark:hover:bg-ms-dark-700 transition-colors md:hidden"
            onClick={() => setOpen(!open)}
          >
            <Bars3Icon className="h-5 w-5 text-gray-900 dark:text-ms-dark-200" />
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {open && (
        <nav className="flex flex-col gap-2 bg-gray-50 dark:bg-ms-dark-800 px-4 py-3 text-gray-700 dark:text-ms-dark-200 md:hidden border-t border-gray-200 dark:border-ms-dark-700">
          <a
            href="#"
            className="py-2 hover:text-ms-blue-500 dark:hover:text-ms-blue-500 transition-colors"
          >
            Login
          </a>
        </nav>
      )}
    </header>
  );
};
