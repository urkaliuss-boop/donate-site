/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0f',
        surface: '#111118',
        'surface-2': '#1a1a24',
        border: '#2a2a3a',
        'border-light': '#3a3a50',
        'text-primary': '#f0f0f5',
        'text-secondary': '#9090aa',
        'text-muted': '#5a5a70',
        'accent-primary': '#7c5cfc',
        'accent-scp': '#4f46e5',
        'accent-cbm': '#f59e0b',
        success: '#22c55e',
        danger: '#ef4444',
      },
    },
  },
  plugins: [],
};
