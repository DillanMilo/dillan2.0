/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
      extend: {},
    },
    safelist: [
      "opacity-0",
      "opacity-100",
      "animate-fadeIn",
      "animate-slideUp",
      "animate-slideInLeft",
      "animate-slideInRight",
      "delay-[200ms]",
      "delay-[500ms]",
      "delay-[800ms]",
      "delay-[1100ms]",
      "delay-[1800ms]",
      "delay-[2500ms]",
      "delay-[3000ms]"
    ],
    plugins: [],
  };
  