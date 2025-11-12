import React, { useEffect, useMemo } from "react";
import { updateMetaTags } from "../utils/metaUtils";
import {
  getPersonSchema,
  getWebsiteSchema,
  getOrganizationSchema,
  getLocalBusinessSchema,
} from "../utils/schema";
import CountdownTimer from "./CountdownTimer";

const Home: React.FC = () => {
  // Set target date to January 5th, 2026
  const targetDate = useMemo(() => {
    return new Date(2026, 0, 5); // Month is 0-indexed, so 0 = January
  }, []);

  useEffect(() => {
    const metaTags = {
      description:
        "Top software developer in The Woodlands, Creekside, Tomball & Houston TX. Expert in custom web development, automation workflows, AI-powered solutions, and small business software. Serving Montgomery County and Greater Houston.",
      keywords:
        "Dillan Milosevich, Software Developer The Woodlands, Web Developer Houston, Tomball Developer, Creekside Developer, React Developer Texas, Front-End Developer Montgomery County, Website Design The Woodlands, Custom Web Development Houston, AI Automation Texas, Workflow Automation, Small Business Software, AI-Powered Solutions, Business Solutions The Woodlands",
      author: "Dillan Milosevich",
      "og:title":
        "Dillan Milosevich | Software Developer in The Woodlands & Houston TX",
      "og:description":
        "Professional software developer serving The Woodlands, Creekside, Tomball & Houston. Custom web development, automation workflows, AI-powered solutions, and small business software for local businesses.",
      "og:type": "website",
      "og:url": window.location.href,
      "twitter:card": "summary_large_image",
      "twitter:title":
        "Dillan Milosevich | Software Developer in The Woodlands & Houston TX",
      "twitter:description":
        "Expert software developer in The Woodlands, Creekside, Tomball & Houston TX. Custom web development, automation workflows, AI-powered solutions & small business software.",
      robots: "index, follow",
      canonical: window.location.href,
      // Add location-specific meta tags
      "geo.region": "US-TX",
      "geo.placename": "The Woodlands, Creekside, Tomball, Houston",
      "geo.position": "30.1658;-95.4613",
      ICBM: "30.1658, -95.4613",
    };

    updateMetaTags(
      metaTags,
      "Dillan Milosevich | Software Developer in The Woodlands & Houston TX"
    );

    // Add JSON-LD structured data with performance optimization
    const addSchemas = () => {
      const schemas = [
        getPersonSchema(),
        getWebsiteSchema(),
        getOrganizationSchema(),
        getLocalBusinessSchema(),
      ];
      const scripts: HTMLScriptElement[] = [];

      schemas.forEach((schema, index) => {
        const script = document.createElement("script");
        script.type = "application/ld+json";
        script.text = JSON.stringify(schema);
        script.id = `schema-${index}`;
        document.head.appendChild(script);
        scripts.push(script);
      });

      return scripts;
    };

    // Use requestIdleCallback to avoid blocking main thread
    let scripts: HTMLScriptElement[] = [];
    if (typeof window !== "undefined") {
      if ("requestIdleCallback" in window) {
        (window as any).requestIdleCallback(() => {
          scripts = addSchemas();
        });
      } else {
        // Fallback for browsers without requestIdleCallback
        setTimeout(() => {
          scripts = addSchemas();
        }, 100);
      }
    }

    return () => {
      scripts.forEach((script) => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      });
    };
  }, []);

  return (
    <main
      id="home"
      className="relative h-screen w-full flex flex-col items-start justify-center px-5 md:px-10 lg:px-20 text-white overflow-x-hidden"
    >
      {/* ✅ Mobile Overlay Background (Only for Mobile) - Optimized loading */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-0 animate-fadeIn md:hidden"
        style={{
          // Use webp version for better performance
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(/IMG_2177.webp)`,
          animationDelay: "300ms",
        }}
      ></div>

      {/* ✅ Desktop Overlay Background (Only for Desktop) - Optimized loading */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-0 animate-fadeIn hidden md:block"
        style={{
          // Use webp version for better performance
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(/IMG_2919.webp)`,
          animationDelay: "300ms",
        }}
      ></div>

      {/* Content */}
      <div className="relative z-10 text-left">
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

        {/* Name Animation with Countdown - Container visible immediately for LCP */}
        <div className="flex items-end gap-4 md:gap-6 lg:gap-8 flex-wrap">
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
          
          {/* Countdown Timer - Next to name */}
          <CountdownTimer targetDate={targetDate} animationDelay="700ms" />
        </div>

        {/* Description */}
        <p
          className="text-xl md:text-2xl mb-30 lg:text-3xl text-gray-300 font-bebas tracking-wide opacity-0 animate-slideInLeft mt-5 md:mt-8 max-w-lg"
          style={{ animationDelay: "800ms" }}
        >
          I design and build websites & software that work as good as they look.
        </p>
      </div>

      {/* Intro Description (Loads in Last) */}
      <p
        className="absolute bottom-25 md:bottom-10 right-5 md:right-10 text-right text-xl md:text-2xl lg:text-3xl text-white font-bebas max-w-xs md:max-w-md opacity-0 animate-slideInRight"
        style={{ animationDelay: "1200ms" }}
      >
        I also create AI-powered solutions and automation workflows that help
        small businesses plug leaks, fix bottlenecks, and save (sometimes
        ridiculous) amounts of money.
      </p>
    </main>
  );
};

export default Home;
