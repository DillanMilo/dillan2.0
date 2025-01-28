/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
      extend: {
        colors: {
          beige: "#f5f5dc", // Custom beige color
        },
        animation: {
          fadeIn: "fadeIn 1.5s ease-in-out forwards",
          expandText: "expandText 2.5s ease-in-out forwards", // Slower animation for better effect
        },
        keyframes: {
          fadeIn: {
            "0%": { opacity: "0" },
            "100%": { opacity: "1" },
          },
          expandText: {
            "0%": { transform: "scaleY(0)", opacity: "0" },
            "100%": { transform: "scaleY(1)", opacity: "1" },
          },
        },
      },
    },
    safelist: [
      "animate-fadeIn",
      "animate-expandText",
      "delay-[300ms]",
      "delay-[700ms]",
    ],
    plugins: [],
  };
  