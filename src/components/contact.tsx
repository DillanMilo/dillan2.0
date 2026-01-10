import React, { useEffect, useRef, useState } from "react";
import ContactForm from "./ContactForm";

const rotatingWords = [
  "Design",
  "AI",
  "Web Development",
  "Functionality",
  "Automation",
  "UI",
  "Responsive Design",
  "Bottlenecks",
  "UX",
] as const;

const socialLinks = [
  {
    name: "LinkedIn",
    link: "https://www.linkedin.com/in/dillan-milosevich-9a817891/",
  },
  { name: "X", link: "https://twitter.com/dillanx1x" },
  { name: "Email", link: "mailto:creativecurrentsx@gmail.com" },
  { name: "GitHub", link: "https://github.com/DillanMilo" },
  { name: "ENS", link: "https://app.ens.domains/dillanxx.eth" },
  { name: "SNS", link: "https://www.sns.id/domain/dillanxx" },
  { name: "BNS", link: "https://app.ens.domains/dillanxx.base.eth" },
  { name: "Call", link: "tel:+12812108139" },
] as const;

const Contact: React.FC = () => {
  const [visibleIndex, setVisibleIndex] = useState(0);
  const [showBanner, setShowBanner] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const bannerTriggerRef = useRef<HTMLDivElement>(null);

  // Set meta data manually without Helmet
  useEffect(() => {
    const metaTags = {
      description:
        "Connect with Dillan Milosevich - Find me on LinkedIn, Twitter, GitHub, or reach out via email to discuss software development and web development projects.",
      keywords:
        "Contact Dillan Milosevich, Software Developer Contact, Web Development Collaboration, Front-End Development, Hire Software Developer",
      author: "Dillan Milosevich",
      "og:title":
        "Contact Dillan Milosevich | Software Developer | Let's Connect",
      "og:description":
        "Ready to bring your web project to life? Connect with Dillan Milosevich, a software developer with front-end expertise, through various social platforms or direct contact methods.",
      "og:type": "website",
      "og:url": window.location.href,
      "twitter:card": "summary_large_image",
      "twitter:title":
        "Contact Dillan Milosevich | Software Developer | Let's Connect",
      "twitter:description":
        "Ready to bring your web project to life? Connect with Dillan Milosevich, a software developer with front-end expertise, through various social platforms or direct contact methods.",
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
    return () => clearInterval(intervalId);
  }, []);

  // Update the intersection observer settings
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Show banner when entering viewport
          if (entry.isIntersecting) {
            setShowBanner(true);
          } else {
            // Hide banner when leaving viewport
            setShowBanner(false);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px",
      }
    );

    if (bannerTriggerRef.current) {
      observer.observe(bannerTriggerRef.current);
    }

    // Don't disconnect the observer so it continues to watch for changes
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="contact"
      className="relative min-h-screen flex flex-col justify-start items-center text-center pt-6 md:pt-10 contact-background overflow-y-auto pb-32"
    >
      {/* Caption - Adjusted for Mobile */}
      <div className="mt-12 sm:mt-14 md:mt-20">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bebas tracking-wide animate-fadeIn">
          Let's Connect and Chat About
        </h2>

        {/* Slot Machine Effect - Adjusted for Mobile */}
        <div className="relative h-[4rem] sm:h-[5rem] md:h-[6rem] flex justify-center items-center overflow-hidden w-auto">
          <div className="relative w-full h-full flex items-center justify-center">
            {rotatingWords.map((word, index) => (
              <span
                key={index}
                className={`absolute inset-0 flex items-center justify-center min-w-[max-content] text-4xl sm:text-5xl md:text-7xl font-bebas text-red-500 sm:text-red-400 transition duration-1000 ease-in-out ${
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

      {/* Contact Form Toggle */}
      <div className="w-full px-5 md:px-10 mt-20 md:mt-12 z-10 flex flex-col items-center">
        {!showForm ? (
          <button
            onClick={() => setShowForm(true)}
            className="group relative px-10 py-5 bg-red-600 hover:bg-red-700 text-white font-bebas text-2xl md:text-3xl tracking-wider rounded-full transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-red-600/40 overflow-hidden"
          >
            <span className="relative z-10">GET IN TOUCH</span>
            <div className="absolute inset-0 bg-gradient-to-r from-red-700 via-red-500 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.3),transparent_70%)]" />
            </div>
          </button>
        ) : (
          <div className="w-full max-w-md animate-formReveal">
            <button
              onClick={() => setShowForm(false)}
              className="mb-6 text-white/60 hover:text-white font-bebas text-lg tracking-wider transition-colors duration-300 flex items-center gap-2 mx-auto"
            >
              <span className="transform rotate-180">&#10148;</span> BACK
            </button>
            <ContactForm />
          </div>
        )}
      </div>

      {/* Divider text */}
      <p className="text-white/60 font-bebas text-lg tracking-wider mt-16 md:mt-10 mb-4 animate-fadeIn" style={{ animationDelay: "500ms" }}>
        OR FIND ME ON
      </p>

      {/* Move trigger div closer to bottom */}
      <div
        ref={bannerTriggerRef}
        className="absolute bottom-[15%] w-full h-1"
        aria-hidden="true"
      />

      {/* Updated banner for both mobile and desktop */}
      <div
        className={`absolute bottom-0 left-0 w-full bg-red-600 transition-all duration-1000
          ${showBanner ? "animate-slideInBanner" : "translate-x-[-100%]"}`}
      >
        <div className="flex overflow-x-auto whitespace-nowrap py-3 px-2 md:px-4 justify-between md:justify-evenly max-w-full md:max-w-screen-xl mx-auto">
          {socialLinks.map((handle, index) => (
            <a
              key={index}
              href={handle.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bebas text-white opacity-0
                ${showBanner ? "animate-fadeInSocial" : ""}`}
              style={{
                animationDelay: `${index * 300 + 1200}ms`,
                animationFillMode: "forwards",
              }}
            >
              {handle.name}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;
