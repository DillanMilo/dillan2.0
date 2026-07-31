import React, { useEffect, useRef } from "react";
import {
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { trackCtaClick } from "../utils/analytics";
import { interpolateScrollValue } from "../utils/scrollEffects";

// import CountdownTimer from "./CountdownTimer";

const Home: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Let the photograph soften into the site's darker background as the hero
  // leaves the viewport. Motion values update outside React's render cycle,
  // keeping the transition smooth and fully reversible on scroll-up.
  const updateHeroBackground = (progress: number) => {
    const hero = heroRef.current;
    if (!hero) return;

    const opacity = interpolateScrollValue(
      progress,
      [0, 0.04, 0.62, 0.9],
      [1, 0.96, 0.28, 0]
    );
    const blur = interpolateScrollValue(
      progress,
      [0, 0.04, 0.62, 0.9],
      [0, 1, 14, 22]
    );
    const scale = interpolateScrollValue(progress, [0, 0.9], [1, 1.08]);

    hero.style.setProperty("--hero-image-opacity", opacity.toString());
    hero.style.setProperty("--hero-image-blur", `${blur}px`);
    hero.style.setProperty("--hero-image-scale", scale.toString());
  };

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (!prefersReducedMotion) updateHeroBackground(progress);
  });

  useEffect(() => {
    updateHeroBackground(prefersReducedMotion ? 0 : scrollYProgress.get());
  }, [prefersReducedMotion, scrollYProgress]);

  return (
    <main
      ref={heroRef}
      id="main-content"
      className="relative h-screen w-full flex flex-col items-start justify-center px-5 md:px-10 lg:px-20 text-white overflow-hidden"
      style={
        {
          "--hero-image-opacity": 1,
          "--hero-image-blur": "0px",
          "--hero-image-scale": 1,
        } as React.CSSProperties
      }
    >
      {/* ✅ Mobile Overlay Background (Only for Mobile) - Optimized loading */}
      <div
        className="absolute inset-0 overflow-hidden opacity-0 animate-fadeIn md:hidden"
        role="img"
        aria-label="Dillan Milosevich portfolio hero background"
        style={{ animationDelay: "300ms" }}
      >
        <div
          aria-hidden="true"
          data-hero-background
          className="absolute inset-[-5%] bg-cover bg-center will-change-[transform,filter,opacity]"
          style={{
            opacity: "var(--hero-image-opacity)",
            filter: "blur(var(--hero-image-blur))",
            transform: "scale(var(--hero-image-scale))",
            // Use webp version for better performance
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(/IMG_2177-optimized.webp)`,
          }}
        />
      </div>

      {/* ✅ Desktop Overlay Background (Only for Desktop) - Optimized loading */}
      <div
        className="absolute inset-0 overflow-hidden opacity-0 animate-fadeIn hidden md:block"
        role="img"
        aria-label="Dillan Milosevich portfolio hero background"
        style={{ animationDelay: "300ms" }}
      >
        <div
          aria-hidden="true"
          data-hero-background
          className="absolute inset-[-5%] bg-cover bg-center will-change-[transform,filter,opacity]"
          style={{
            opacity: "var(--hero-image-opacity)",
            filter: "blur(var(--hero-image-blur))",
            transform: "scale(var(--hero-image-scale))",
            // Use webp version for better performance
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(/IMG_2919-1920.webp)`,
          }}
        />
      </div>

      {/* Countdown Timer — commented out while available for work
      <CountdownTimer targetDate={new Date("2026-04-06")} />
      */}

      {/* Content */}
      <div className="relative z-10 text-left mt-0 md:mt-0">
        <h1
          className="text-4xl md:text-5xl lg:text-6xl text-white font-bebas opacity-0 animate-fadeIn mb-10 md:mb-14"
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
              className="inline-block opacity-0 animate-slideUp"
              style={{ animationDelay: `${index * 100 + 100}ms` }}
            >
              {letter}
            </span>
          ))}
        </div>

        {/* Description */}
        <p
          className="text-xl md:text-2xl mb-30 lg:text-3xl text-gray-300 font-bebas tracking-wide opacity-0 animate-slideInLeft mt-5 md:mt-8 max-w-lg"
          style={{ animationDelay: "800ms" }}
        >
          I design and build websites & software that work as well as they look.
        </p>

      </div>

      {/* Intro Description */}
      <p
        className="absolute bottom-25 md:bottom-10 right-5 md:right-10 text-right text-xl md:text-2xl lg:text-3xl text-white font-bebas max-w-xs md:max-w-md opacity-0 animate-slideInRight"
        style={{ animationDelay: "1000ms" }}
      >
        I also create AI-powered solutions and automation workflows that help
        small businesses plug leaks, fix bottlenecks, and save (sometimes
        ridiculous) amounts of money.
      </p>

      {/* CTA Button - Bottom of page, loads last */}
      <div
        className="absolute bottom-6 sm:bottom-8 md:bottom-10 left-5 md:left-10 lg:left-20 z-10 opacity-0 animate-fadeIn"
        style={{ animationDelay: "1200ms" }}
      >
        <button
          onClick={() => {
            trackCtaClick("lets_work_together", "hero", "contact");
            const contactSection = document.getElementById("contact");
            if (contactSection) {
              contactSection.scrollIntoView({ behavior: "smooth" });
            }
          }}
          className="px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 bg-transparent border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white font-bebas text-base sm:text-lg md:text-2xl tracking-wider rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-500/30 cta-glow"
          aria-label="Let's work together — navigate to the contact section"
        >
          LET'S WORK TOGETHER
        </button>
      </div>
    </main>
  );
};

export default Home;
