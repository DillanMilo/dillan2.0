/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
      extend: {
        colors: {
          beige: "#f5f5dc",
        },
        animation: {
          fadeIn: "fadeIn 1.5s ease-in-out forwards",
          slideUp: "slideUp 1.75s ease-in-out forwards",
          slideInLeft: "slideInLeft 1.5s ease-in-out 0.5s forwards",
        },
        keyframes: {
          fadeIn: {
            "0%": { opacity: "0" },
            "100%": { opacity: "1" },
          },
          slideUp: {
            "0%": { opacity: "0", transform: "scaleY(0)" },
            "100%": { opacity: "1", transform: "scaleY(1)" },
          },
          slideInLeft: {
            "0%": { opacity: "0", transform: "translateX(-50px)" },
            "100%": { opacity: "1", transform: "translateX(0)" },
          },
        },
      },
    },
    safelist: [
      "delay-300",
      "delay-700",
    ],
    plugins: [],
  };
  