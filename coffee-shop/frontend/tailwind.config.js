/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          // Official Brand Color Palette Specification
          vantablack: "#050505",       // #050505 · Luxury backgrounds
          deepBlack: "#171717",        // #171717 · Main sections and navbar
          black: "#171717",            // Deep Black alias
          sandBeige: "#D8C3A5",        // #D8C3A5 · Secondary backgrounds
          sand: "#D8C3A5",             // Sand Beige alias
          warmSand: "#E8D8C3",         // #E8D8C3 · Cards and highlights
          creamWhite: "#F7F3EC",       // #F7F3EC · Headings and text
          cream: "#F7F3EC",            // Cream White alias
          goldenYellow: "#E9B949",     // #E9B949 · Buttons and accents
          gold: "#E9B949",             // Golden Yellow alias
          secondary: "#141414",        // Luxury card fill
          charcoal: "#242424",         // Border / subtle divider
          white: "#FFFFFF",
          muted: "#9E978E",            // Soft muted text
        }
      },
      spacing: {
        4.5: '1.125rem',               // 18px
      },
      fontFamily: {
        heading: ["'Playfair Display'", "serif"],
        body: ["'Inter'", "sans-serif"],
        accent: ["'DM Sans'", "sans-serif"],
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 12s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(3deg)' },
        }
      }
    },
  },
  plugins: [],
}
