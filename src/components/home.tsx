import React, { useEffect } from "react";
import { trackCtaClick } from "../utils/analytics";
import { updateMetaTags } from "../utils/metaUtils";

// import CountdownTimer from "./CountdownTimer";

const Home: React.FC = () => {

  useEffect(() => {
    const metaTags = {
      description:
        "Custom websites, AI automation, and small business software by Dillan Milosevich, serving The Woodlands, Tomball, Houston, and Montgomery County.",
      keywords:
        "Dillan Milosevich, web developer The Woodlands TX, software developer Houston, custom website development, AI automation, workflow automation, small business software, React developer Texas",
      author: "Dillan Milosevich",
      "og:title":
        "Dillan Milosevich | Web Developer in The Woodlands TX",
      "og:description":
        "Custom websites, AI automation, workflow automation, and small business software for companies in The Woodlands, Tomball, Houston, and Montgomery County.",
      "og:type": "website",
      "og:url": "https://www.dillanmilo.com/",
      "twitter:card": "summary_large_image",
      "twitter:title":
        "Dillan Milosevich | Web Developer in The Woodlands TX",
      "twitter:description":
        "Custom websites, AI automation, workflow automation, and small business software for The Woodlands, Tomball, Houston, and Montgomery County.",
      robots: "index, follow",
      canonical: "https://www.dillanmilo.com/",
      // Add location-specific meta tags
      "geo.region": "US-TX",
      "geo.placename": "The Woodlands, Creekside, Tomball, Houston",
      "geo.position": "30.1658;-95.4613",
      ICBM: "30.1658, -95.4613",
    };

    updateMetaTags(
      metaTags,
      "Dillan Milosevich | Web Developer in The Woodlands TX"
    );
  }, []);

  return (
    <main
      className="relative h-screen w-full flex flex-col items-start justify-center px-5 md:px-10 lg:px-20 text-white overflow-x-hidden"
    >
      {/* ✅ Mobile Overlay Background (Only for Mobile) - Optimized loading */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-0 animate-fadeIn md:hidden"
        role="img"
        aria-label="Dillan Milosevich portfolio hero background"
        style={{
          // Use webp version for better performance
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(/IMG_2177.webp)`,
          animationDelay: "300ms",
        }}
      ></div>

      {/* ✅ Desktop Overlay Background (Only for Desktop) - Optimized loading */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-0 animate-fadeIn hidden md:block"
        role="img"
        aria-label="Dillan Milosevich portfolio hero background"
        style={{
          // Use webp version for better performance
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(/IMG_2919.webp)`,
          animationDelay: "300ms",
        }}
      ></div>

      {/* Countdown Timer — commented out while available for work
      <CountdownTimer targetDate={new Date("2026-04-06")} />
      */}

      {/* Content */}
      <div className="relative z-10 text-left mt-0 md:mt-0">
        {/* SEO-optimized H1 for screen readers */}
        <h1 className="sr-only">
          Dillan Milosevich - Web Development, Automation Workflows & Small
          Business Software Solutions in The Woodlands TX
        </h1>

        <h2
          className="text-4xl md:text-5xl lg:text-6xl text-white font-bebas animate-fadeIn mb-10 md:mb-14"
          style={{ animationDelay: "0ms" }}
        >
          Heya, my name is
        </h2>

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
      <button
        onClick={() => {
          trackCtaClick("lets_work_together", "hero", "contact");
          const contactSection = document.getElementById("contact");
          if (contactSection) {
            contactSection.scrollIntoView({ behavior: "smooth" });
          }
        }}
        className="absolute bottom-6 sm:bottom-8 md:bottom-10 left-5 md:left-10 lg:left-20 px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 bg-transparent border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white font-bebas text-base sm:text-lg md:text-2xl tracking-wider rounded-full transition-all duration-300 opacity-0 hover:scale-105 hover:shadow-lg hover:shadow-red-500/30 z-10 cta-glow"
        aria-label="Navigate to contact section"
      >
        LET'S WORK TOGETHER
      </button>
    </main>
  );
};

export default Home;
