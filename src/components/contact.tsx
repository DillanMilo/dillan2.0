import React, { useEffect, useRef, useState } from "react";

const rotatingWords = [
  "Design",
  "Web Development",
  "Functionality",
  "UI",
  "Responsive Design",
  "UX",
  "Videogames",
] as const;

const socialLinks = [
  {
    name: "LinkedIn",
    link: "https://www.linkedin.com/in/dillan-milosevich-9a817891/",
  },
  { name: "X", link: "https://twitter.com/dillanx1x" },
  { name: "Email", link: "mailto:dillanxx@gmail.com" },
  { name: "GitHub", link: "https://github.com/DillanMilo" },
  { name: "ENS", link: "https://app.ens.domains/dillanxx.eth" },
  { name: "SNS", link: "https://sns.id/domain?domain=dillanxx" },
  { name: "BNS", link: "https://app.ens.domains/dillanxx.base.eth" },
  { name: "Call", link: "tel:+12812108139" },
] as const;

const Contact: React.FC = () => {
  const handlesRef = useRef<HTMLDivElement>(null);
  const [visibleIndex, setVisibleIndex] = useState(0);

  // Set meta data manually without Helmet
  useEffect(() => {
    const metaTags = {
      description:
        "Connect with Dillan Milosevich - Find me on LinkedIn, Twitter, GitHub, or reach out via email to discuss web development projects and opportunities.",
      keywords:
        "Contact Dillan Milosevich, Developer Contact, Web Development Collaboration, Hire Front-End Developer",
      author: "Dillan Milosevich",
      "og:title": "Contact Dillan Milosevich | Let's Connect",
      "og:description":
        "Ready to bring your web project to life? Connect with Dillan Milosevich through various social platforms or direct contact methods.",
      "og:type": "website",
      "og:url": window.location.href,
      "twitter:card": "summary_large_image",
      "twitter:title": "Contact Dillan Milosevich | Let's Connect",
      "twitter:description":
        "Ready to bring your web project to life? Connect with Dillan Milosevich through various social platforms or direct contact methods.",
      robots: "index, follow",
      canonical: window.location.href,
    };

    document.title = "Contact | Dillan Milosevich";

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

  // Rotate words every 1.5 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      setVisibleIndex((prevIndex) => (prevIndex + 1) % rotatingWords.length);
    }, 1500);

    return () => clearInterval(intervalId); // More explicit cleanup
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            handlesRef.current?.classList.add("animate-fadeIn", "opacity-100");
            handlesRef.current?.classList.remove("opacity-0");
          } else {
            handlesRef.current?.classList.remove(
              "animate-fadeIn",
              "opacity-100"
            );
            handlesRef.current?.classList.add("opacity-0");
          }
        });
      },
      { threshold: 0.5 }
    );
    if (handlesRef.current) observer.observe(handlesRef.current);
    return () => {
      if (handlesRef.current) observer.unobserve(handlesRef.current);
    };
  }, []);

  return (
    <section
      id="contact"
      className="relative h-screen flex flex-col justify-start items-center text-center pt-20 contact-background"
    >
      {/* Caption - Adjusted for Mobile */}
      <div className="mt-66 sm:mt-40">
        <h2 className="text-5xl sm:text-8xl md:text-6xl font-bebas tracking-wide animate-fadeIn">
          Let's connect and chat about
        </h2>

        {/* Slot Machine Effect - Adjusted for Mobile */}
        <div className="relative h-[6rem] sm:h-[6rem] md:h-[6rem] flex justify-center items-center overflow-hidden w-auto">
          <div className="relative w-full h-full flex items-center justify-center">
            {rotatingWords.map((word, index) => (
              <span
                key={index}
                className={`absolute inset-0 flex items-center justify-center min-w-[max-content] text-6xl sm:text-6xl md:text-10xl font-bebas text-paleRed transition duration-1000 ease-in-out ${
                  index === visibleIndex
                    ? "opacity-100 scale-100 translate-y-0"
                    : "opacity-0 scale-90 translate-y-4"
                }`}
              >
                {word}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Handles - Positioned at bottom of contact section */}
      <div
        ref={handlesRef}
        className="absolute bottom-10 sm:bottom-12 md:bottom-16 gap-3 left-1/2 transform -translate-x-1/2 flex flex-nowrap items-center sm:gap-6 px-4 overflow-x-auto max-w-screen-lg whitespace-nowrap transition-opacity duration-1000 opacity-0 animate-fadeIn"
      >
        {socialLinks.map((handle, index) => (
          <a
            key={index}
            href={handle.link}
            target="_blank"
            rel="noreferrer"
            className="text-2xl sm:text-3xl md:text-5xl font-bebas text-red-600 transition-all duration-300 hover:text-red-400 whitespace-nowrap [text-shadow:-0.5px_0_0_black,0.5px_0_0_black,0_-0.5px_0_black,0_0.5px_0_black,-0.5px_-0.5px_0_black,0.5px_-0.5px_0_black,-0.5px_0.5px_0_black,0.5px_0.5px_0_black]"
          >
            {handle.name}
          </a>
        ))}
      </div>
    </section>
  );
};

export default Contact;
