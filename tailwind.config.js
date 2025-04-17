/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
      extend: {
        colors: {
          beige: "#f5f5dc",
          slateGreen: "#a8b2ac", // Custom beige color
        },
        textShadow: {
          'white': '-1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff',
        },
      },
    },
    safelist: [], // No longer needed for animations since they're in index.css
    plugins: [
      function ({ addUtilities }) {
        const newUtilities = {
          '.text-shadow-white': {
            'text-shadow': `-2px -2px 0 #fff, 
                            2px -2px 0 #fff, 
                            -2px 2px 0 #fff, 
                            2px 2px 0 #fff,
                            0 0 4px #fff`  // Added extra glow
          },
        }
        addUtilities(newUtilities)
      },
    ],
  };
  