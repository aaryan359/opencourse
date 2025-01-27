/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-dark': '#0e0f1f',
         'c_tech_color': '#e5329a',
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(110deg, #090e73, #84a5f4)',
      },
      fontFamily: {
        oswald: ['Oswald', 'serif'],
      },
      fontWeight: {
        600: '600',
      },
    },

  },

  plugins: [
    
  ],
}

