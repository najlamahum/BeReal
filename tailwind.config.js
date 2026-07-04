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
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-up-quick': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-out': {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 600ms ease-out forwards',
        // Onboarding 1 -> 1.1 specifically: a snappier ease-in entrance
        // (300ms) so the whole screen-to-screen change reads as one
        // quick, deliberate transition rather than the slower 600ms
        // entrance used elsewhere.
        'fade-in-up-quick': 'fade-in-up-quick 300ms ease-in forwards',
        // Onboarding - 1.1's subtitle specifically: reuses the same 8px
        // drift as fade-in-up-quick, but slower and ease-in so it reads
        // as a smooth ease rather than an instant pop.
        'fade-in-up-subtitle': 'fade-in-up-quick 500ms ease-in forwards',
        // ease-in (not ease-out) is the conventional pairing for an
        // exit/fade-out — it starts slow and accelerates away, reading
        // as "smart"/intentional rather than the entrance curve run
        // backwards.
        'fade-out': 'fade-out 300ms ease-in forwards',
      },
    },
  },
  plugins: [],
}
