/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bereal: {
          black: '#000000',
          surface: '#1c1c1e',
          surface2: '#2c2c2e',
          ink: '#ffffff',
          muted: '#B6B9BF',
          gold: '#F5C518',
          blue: '#3B82F6',
        },
      },
    },
  },
  plugins: [],
}
