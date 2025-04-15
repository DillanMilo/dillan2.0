import React, { useEffect } from "react";
import bgImageMobile from "../assets/IMG_07154.jpg"; // Mobile Background

const Home: React.FC = () => {
  useEffect(() => {
    // Set the document title for the Home page
    document.title = "Dillan Milosevich | Creative Front-End Developer";

    // Define meta tag contents
    const metaTags = {
      description:
        "Welcome to Dillan Milosevich's portfolio - a creative front-end developer specializing in beautiful, functional websites. Explore my projects and UI/UX development work.",
      keywords:
        "Dillan Milosevich, Front-End Developer, UI/UX Developer, Web Development, React Developer, Creative Developer, Website Design",
      author: "Dillan Milosevich",
      "og:title": "Dillan Milosevich | Creative Front-End Developer",
      "og:description":
        "Creative front-end developer crafting beautiful and functional websites. Explore my portfolio and web development projects.",
      "og:type": "website",
      "og:url": window.location.href,
      "twitter:card": "summary_large_image",
      "twitter:title": "Dillan Milosevich | Creative Front-End Developer",
      "twitter:description":
        "Creative front-end developer crafting beautiful and functional websites. Explore my portfolio and web development projects.",
      robots: "index, follow",
      canonical: window.location.href,
    };

    // Function to create or update meta tags
    const updateMetaTag = (name: string, content: string) => {
      let metaTag =
        document.querySelector(`meta[name='${name}']`) ||
        document.querySelector(`meta[property='${name}']`);

      if (metaTag) {
        metaTag.setAttribute("content", content);
      } else {
        metaTag = document.createElement("meta");
        if (name.startsWith("og:")) {
          metaTag.setAttribute("property", name);
        } else {
          metaTag.setAttribute("name", name);
        }
        metaTag.setAttribute("content", content);
        document.head.appendChild(metaTag);
      }
    };

    // Create or update canonical link
    let canonicalLink = document.querySelector("link[rel='canonical']");
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", metaTags.canonical);

    // Apply all meta tags
    Object.entries(metaTags).forEach(([name, content]) => {
      updateMetaTag(name, content);
    });
  }, []);

  return (
    <div
      id="home"
      className="relative h-screen w-full flex flex-col items-start justify-center px-5 md:px-10 lg:px-20 text-white overflow-x-hidden"
    >
      {/* ✅ Mobile Overlay Background (Only for Mobile) */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-0 animate-fadeIn md:hidden"
        style={{
          // Combine a dimming gradient with the mobile background image
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${bgImageMobile})`,
          animationDelay: "2500ms",
        }}
      ></div>

      {/* Content */}
      <div className="relative z-10 text-left">
        <h2
          className="text-4xl md:text-5xl lg:text-6xl text-white font-bebas opacity-0 animate-fadeIn mb-10 md:mb-14"
          style={{ animationDelay: "200ms" }}
        >
          Heya, my name is
        </h2>

        {/* Name Animation */}
        <h1 className="text-[6rem] md:text-[10rem] lg:text-[15rem] font-bebas font-bold tracking-wide transform scale-y-200 opacity-0 animate-fadeIn flex">
          {"Dillan".split("").map((letter, index) => (
            <span
              key={index}
              className="inline-block opacity-0 animate-slideUp"
              style={{ animationDelay: `${index * 150 + 500}ms` }}
            >
              {letter}
            </span>
          ))}
        </h1>

        {/* Description */}
        <p
          className="text-xl md:text-2xl mb-30 lg:text-3xl text-gray-300 font-bebas tracking-wide opacity-0 animate-slideInLeft mt-5 md:mt-8 max-w-lg"
          style={{ animationDelay: "1200ms" }}
        >
          I build stuff and make things look nice on the web.
        </p>
      </div>

      {/* Intro Description (Loads in Last) */}
      <p
        className="absolute bottom-25 md:bottom-10 right-5 md:right-10 text-right text-xl md:text-2xl lg:text-3xl text-white font-bebas max-w-xs md:max-w-md opacity-0 animate-slideInRight"
        style={{ animationDelay: "2000ms" }}
      >
        I'm a creative front-end developer who loves crafting beautiful and
        functional websites. My passion lies in blending art with code to bring
        ideas to life.
      </p>
    </div>
  );
};

export default Home;
