export function Footer() {
  return (
    <footer className="w-full dark:bg-gray-900 py-4 bg-white border-t border-gray-200 dark:border-vscode-border">
      <div className="text-center text-sm text-gray-500">
        © {new Date().getFullYear()} MyApp. All rights reserved.
      </div>
    </footer>
  );
}
