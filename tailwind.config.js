/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
      extend: {
        colors: {
          beige: "#f5f5dc",
          slateGreen: "#a8b2ac", // Custom beige color
        },
      },
    },
    safelist: [], // No longer needed for animations since they're in index.css
    plugins: [],
  };
  