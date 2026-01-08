import React, { useState, useEffect } from "react";

const FloatingCTA: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAtContact, setIsAtContact] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling past 80% of the viewport height (past hero)
      const scrollThreshold = window.innerHeight * 0.8;
      const shouldShow = window.scrollY > scrollThreshold;
      setIsVisible(shouldShow);

      // Check if we're at the contact section
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        const contactRect = contactSection.getBoundingClientRect();
        const isInContact = contactRect.top < window.innerHeight * 0.5;
        setIsAtContact(isInContact);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Don't render if we're already at the contact section
  if (isAtContact) return null;

  return (
    <button
      onClick={scrollToContact}
      className={`fixed bottom-6 right-6 z-50 px-5 py-3 bg-red-600 hover:bg-red-700 text-white font-bebas text-lg tracking-wider shadow-lg shadow-red-600/30 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-red-600/40 ${
        isVisible
          ? "translate-y-0 opacity-100"
          : "translate-y-20 opacity-0 pointer-events-none"
      }`}
      aria-label="Navigate to contact section"
    >
      <span className="flex items-center gap-2">
        GET IN TOUCH
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </span>
    </button>
  );
};

export default FloatingCTA;
