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
          expandText: "expandText 2.5s ease-in-out forwards", // Expand animation for Info section
          slideUp: "slideUp 1s ease-in-out forwards", // Slide up animation for Work section
          rotateWord: "rotateWord 1.5s ease-in-out infinite", // Slot-machine animation for Contact section
          fadeInUp: "fadeInUp 1.5s ease-in-out forwards", // Fade-in up animation for Orientation popup
          scaleIn: "scaleIn 2s ease-in-out forwards", // Scale-in effect for smooth appearance
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
          rotateWord: {
            "0%": { transform: "translateY(100%)", opacity: "0" },
            "50%": { transform: "translateY(0%)", opacity: "1" },
            "100%": { transform: "translateY(-100%)", opacity: "0" },
          },
          fadeInUp: {
            "0%": { opacity: "0", transform: "translateY(20px)" },
            "100%": { opacity: "1", transform: "translateY(0)" },
          },
          scaleIn: {
            "0%": { transform: "scale(0.8)", opacity: "0" },
            "100%": { transform: "scale(1)", opacity: "1" },
          },
        },
      },
    },
    safelist: [
      "animate-fadeIn",
      "animate-expandText",
      "animate-slideUp", // Slide-up animation for Work section
      "animate-rotateWord", // Rotating animation for Contact section
      "animate-fadeInUp", // Fade-in animation for popup
      "animate-scaleIn", // Scale-in effect for smooth appearance
      "delay-[300ms]",
      "delay-[700ms]",
      "delay-[1000ms]", // Delays for smoother animations
    ],
    plugins: [],
  };
  