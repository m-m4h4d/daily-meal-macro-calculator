/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './app.html', './404.html'],
  darkMode: 'class',
  // app.html builds these class names at runtime from a color variable
  // (macro "g left" pills and Macro Finisher badges), so the scanner can't see them.
  safelist: [
    {
      pattern: /^(bg)-(indigo|emerald|rose|violet)-500\/(10|15)$/,
    },
    {
      pattern: /^text-(indigo|emerald|rose|violet)-(300|400|600)$/,
      variants: ['dark'],
    },
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        brand: {
          50: '#eef2ff',
          100: '#e0e7ff',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
        },
      },
    },
  },
  plugins: [],
};
