/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
      extend: {
        colors: {
          beige: "#f5f5dc", // Custom beige color
        },
        animation: {
          fadeIn: "fadeIn 1.5s ease-in-out forwards", // Smooth fade-in animation
          expandText: "expandText 2.5s ease-in-out forwards", // Slower expand animation for the Info section title
          slideUp: "slideUp 1s ease-in-out forwards", // Slide up animation for Work section
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
          slideUp: {
            "0%": { opacity: "0", transform: "translateY(50px)" },
            "100%": { opacity: "1", transform: "translateY(0)" },
          },
        },
      },
    },
    safelist: [
      "animate-fadeIn",
      "animate-expandText",
      "animate-slideUp", // Safelist slideUp animation for Work section
      "delay-[300ms]",
      "delay-[700ms]",
      "delay-[1000ms]", // Added delay for smoother animations
    ],
    plugins: [],
  };
  