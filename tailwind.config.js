/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // VS Code Dark Theme Colors
        vscode: {
          bg: '#1e1e1e',
          'bg-secondary': '#252526',
          'input-bg': '#3c3c3c',
          border: '#3e3e42',
          text: '#d4d4d4',
          'text-secondary': '#858585',
          blue: '#007acc',
          'status-bar': '#007acc',
        },
      },
    },
  },
  plugins: [],
};
