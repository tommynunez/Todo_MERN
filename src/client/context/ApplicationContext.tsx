import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';

interface ApplicationContextType {
  isDark: boolean;
  toggleDarkMode: () => void;
}

const ApplicationContext = createContext<ApplicationContextType | undefined>(
  undefined,
);

export function ApplicationProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState<boolean>(() => {
    const stored = localStorage.getItem('darkMode');
    if (stored !== null) {
      return stored === 'true';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', isDark.toString());

    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
  };

  return (
    <ApplicationContext.Provider value={{ isDark, toggleDarkMode }}>
      {children}
    </ApplicationContext.Provider>
  );
}

export const useApplicationContext = () => {
  const context = useContext(ApplicationContext);
  if (context === undefined) {
    throw new Error(
      'useApplicationContext must be used within ApplicationProvider',
    );
  }
  return context;
};
