/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#3b49df',
        background: {
          light: '#fdfbf7',
          dark: '#0f0f23',
        },
        card: {
          light: '#ffffff',
          dark: '#1a1a2e',
        },
        text: {
          light: '#1a1a2e',
          dark: '#e2e8f0',
        },
        heading: {
          light: '#0f0f23',
          dark: '#f8fafc',
        },
        code: {
          light: '#f6f8fa',
          dark: '#1e293b',
        },
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      fontSize: {
        'body': '18px',
      },
      lineHeight: {
        'body': '1.7',
      },
      boxShadow: {
        'card': '0 2px 16px rgba(0,0,0,0.04)',
        'card-hover': '0 4px 24px rgba(0,0,0,0.08)',
      },
      borderWidth: {
        '3': '3px',
      },
    },
  },
  plugins: [],
}