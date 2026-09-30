/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sand: {
          50: '#FAF8F5',
          100: '#F5F2EB', // Primary editorial nude background
          200: '#E8E2D6', // Secondary muted warm beige
          300: '#DDD5C4',
          400: '#C7BBA5',
          500: '#A99B85',
          600: '#7E7260',
          700: '#574F43',
          800: '#38322B',
          900: '#231F1B',
        },
        coquette: {
          50: '#FDF6F7',
          100: '#FCEBED', // Softest baby pink
          200: '#F8D5DB', // Romantic blush
          300: '#F0ADC0',
          400: '#E685A0', // Flirty vibrant rose
          500: '#D45B7F',
          600: '#BA3D63', // Deep raspberry
          700: '#962B4C',
          800: '#641931',
        },
        terracotta: {
          50: '#FAF1ED',
          100: '#F4DFD7',
          200: '#E7BEAE',
          300: '#D79981',
          400: '#C67759',
          500: '#B85D3B', // Warm organic bio-accent
          600: '#9B4B2D',
          700: '#7C3A22',
        },
        rosewood: {
          50: '#F8F1F0',
          100: '#EEDFDA',
          200: '#DDBFB7',
          300: '#C79A90',
          400: '#C27D6B', // Palo de rosa
          500: '#A86150',
          600: '#8A493B',
        },
        gold: {
          300: '#E4CF9C',
          400: '#D5BA7C',
          500: '#C5A059',
          600: '#A58039',
        },
        charcoal: {
          800: '#2A2A2A',
          850: '#22201F',
          900: '#1A1817',
          950: '#121110',
        },
        botanical: {
          400: '#5B7561',
          500: '#435848',
          600: '#324236',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Montserrat', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        script: ['"Pinyon Script"', 'cursive', 'Georgia'],
        italiana: ['Italiana', 'serif'],
      },
      letterSpacing: {
        'widest-plus': '0.28em',
        'editorial': '0.18em',
        'coquette': '0.08em',
      },
      boxShadow: {
        'luxury': '0 20px 40px -15px rgba(42, 42, 42, 0.08)',
        'luxury-hover': '0 30px 60px -12px rgba(42, 42, 42, 0.15)',
        'coquette-glow': '0 10px 30px -5px rgba(240, 173, 192, 0.45)',
        'glass': '0 8px 32px 0 rgba(42, 35, 30, 0.06)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        floatGentle: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'float-gentle': 'floatGentle 4s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
