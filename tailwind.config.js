/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
      extend: {
        animation: {
          fadeIn: "fadeIn 1.5s ease-in-out forwards",
          slideUp: "slideUp 1.5s ease-in-out forwards",
          slideInLeft: "slideInLeft 1.5s ease-in-out forwards",
          slideInRight: "slideInRight 1.5s ease-in-out forwards",
        },
        keyframes: {
          fadeIn: {
            "0%": { opacity: "0" },
            "100%": { opacity: "1" },
          },
          slideUp: {
            "0%": { opacity: "0", transform: "translateY(20px)" },
            "100%": { opacity: "1", transform: "translateY(0)" },
          },
          slideInLeft: {
            "0%": { opacity: "0", transform: "translateX(-50px)" },
            "100%": { opacity: "1", transform: "translateX(0)" },
          },
          slideInRight: {
            "0%": { opacity: "0", transform: "translateX(50px)" },
            "100%": { opacity: "1", transform: "translateX(0)" },
          },
        },
      },
    },
    safelist: [
      "delay-[200ms]",
      "delay-[500ms]",
      "delay-[800ms]",
      "delay-[950ms]",
      "delay-[1000ms]",
      "delay-[1800ms]",
      "delay-[2500ms]",
      "delay-[3000ms]",
      "delay-[3500ms]",
    ],
    plugins: [],
  };
  