import React from "react";
import { trackCtaClick } from "../utils/analytics";

// import CountdownTimer from "./CountdownTimer";

const Home: React.FC = () => {
  return (
    <main
      id="main-content"
      className="relative h-screen w-full flex flex-col items-start justify-center px-5 md:px-10 lg:px-20 text-white overflow-x-hidden"
    >
      {/* ✅ Mobile Overlay Background (Only for Mobile) - Optimized loading */}
      <div
        className="absolute inset-0 bg-cover bg-center md:hidden"
        role="img"
        aria-label="Dillan Milosevich portfolio hero background"
        style={{
          // Use webp version for better performance
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(/IMG_2177-optimized.webp)`,
          animationDelay: "300ms",
        }}
      ></div>

      {/* ✅ Desktop Overlay Background (Only for Desktop) - Optimized loading */}
      <div
        className="absolute inset-0 bg-cover bg-center hidden md:block"
        role="img"
        aria-label="Dillan Milosevich portfolio hero background"
        style={{
          // Use webp version for better performance
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(/IMG_2919-1920.webp)`,
          animationDelay: "300ms",
        }}
      ></div>

      {/* Countdown Timer — commented out while available for work
      <CountdownTimer targetDate={new Date("2026-04-06")} />
      */}

      {/* Content */}
      <div className="relative z-10 text-left mt-0 md:mt-0">
        <h1
          className="text-4xl md:text-5xl lg:text-6xl text-white font-bebas mb-10 md:mb-14"
        >
          Heya, my name is
          <span className="sr-only">
            {" "}Dillan Milosevich, a web developer and automation software
            builder in The Woodlands, Texas
          </span>
        </h1>

        {/* Name Animation - Container visible immediately for LCP */}
        <div
          className="text-[6rem] md:text-[10rem] lg:text-[15rem] font-bebas font-bold tracking-wide transform scale-y-200 flex"
          aria-hidden="true"
        >
          {"Dillan".split("").map((letter, index) => (
            <span
              key={index}
              className="inline-block"
            >
              {letter}
            </span>
          ))}
        </div>

        {/* Description */}
        <p
          className="text-xl md:text-2xl mb-30 lg:text-3xl text-gray-300 font-bebas tracking-wide mt-5 md:mt-8 max-w-lg"
        >
          I design and build websites & software that work as well as they look.
        </p>

      </div>

      {/* Intro Description */}
      <p
        className="absolute bottom-25 md:bottom-10 right-5 md:right-10 text-right text-xl md:text-2xl lg:text-3xl text-white font-bebas max-w-xs md:max-w-md"
      >
        I also create AI-powered solutions and automation workflows that help
        small businesses plug leaks, fix bottlenecks, and save (sometimes
        ridiculous) amounts of money.
      </p>

      {/* CTA Button - Bottom of page, loads last */}
      <button
        onClick={() => {
          trackCtaClick("lets_work_together", "hero", "contact");
          const contactSection = document.getElementById("contact");
          if (contactSection) {
            contactSection.scrollIntoView({ behavior: "smooth" });
          }
        }}
        className="absolute bottom-6 sm:bottom-8 md:bottom-10 left-5 md:left-10 lg:left-20 px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 bg-transparent border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white font-bebas text-base sm:text-lg md:text-2xl tracking-wider rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-500/30 z-10 cta-glow"
        aria-label="Let's work together — navigate to the contact section"
      >
        LET'S WORK TOGETHER
      </button>
    </main>
  );
};

export default Home;
