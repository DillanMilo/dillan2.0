import React, { useState, useEffect, useCallback } from "react";

const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("home");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Delay navbar appearance
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Custom smooth scroll function with adjustable duration (default is 1500ms)
  const smoothScrollTo = (targetY: number, duration: number = 1500) => {
    const startY = window.scrollY;
    const diff = targetY - startY;
    let startTime: number | null = null;

    // Easing function for a smooth transition
    const easeInOutQuad = (t: number) =>
      t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const time = timestamp - startTime;
      const progress = Math.min(time / duration, 1);
      const ease = easeInOutQuad(progress);
      window.scrollTo(0, startY + diff * ease);
      if (time < duration) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  };

  const handleScroll = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      let targetY = element.getBoundingClientRect().top + window.pageYOffset;

      // If clicking contact, scroll to bottom of the section
      if (id === "contact") {
        targetY = element.offsetTop + element.offsetHeight - window.innerHeight;
      }

      smoothScrollTo(targetY, 1500);
    }
  };

  const handleScrollSpy = useCallback(() => {
    const sections = ["home", "info", "work", "contact"];
    const currentSection = sections.find((section) => {
      const element = document.getElementById(section);
      if (!element) return false;
      const rect = element.getBoundingClientRect();
      return rect.top >= 0 && rect.top < window.innerHeight / 2;
    });

    if (currentSection) {
      setActiveSection(currentSection);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScrollSpy);
    return () => window.removeEventListener("scroll", handleScrollSpy);
  }, [handleScrollSpy]);

  // Check if scrolled past home section
  const [isPastHome, setIsPastHome] = useState(false);

  useEffect(() => {
    const checkScrollPosition = () => {
      const homeSection = document.getElementById("home");
      if (homeSection) {
        const homeBottom = homeSection.offsetTop + homeSection.offsetHeight;
        setIsPastHome(window.scrollY > homeBottom - 100);
      }
    };

    window.addEventListener("scroll", checkScrollPosition);
    return () => window.removeEventListener("scroll", checkScrollPosition);
  }, []);

  return (
    <nav
      className={`fixed top-2 right-3 sm:top-4 sm:right-5 z-50 flex justify-end transform ${
        isVisible ? "translate-x-0 opacity-100" : "translate-x-20 opacity-0"
      } transition-all duration-1000 ease-out`}
    >
      <ul className="flex gap-3 sm:gap-4 md:gap-5">
        {["info", "work", "contact"].map((section) => (
          <li key={section}>
            {section === "contact" ? (
              <button
                className={`relative transition-all duration-300
                text-2xl sm:text-3xl md:text-4xl lg:text-5xl px-2 sm:px-3 font-bebas
                ${activeSection === section ? "after:w-full" : "after:w-0"}
                hover:after:w-full after:absolute after:left-0 after:bottom-[-2px] after:h-[1px] after:transition-all after:duration-300
                ${isPastHome
                  ? "sm:text-white sm:after:bg-white"
                  : "text-white after:bg-white"
                }`}
                onClick={() => handleScroll(section)}
              >
                {/* Desktop - always show Contact */}
                <span className="hidden sm:inline">Contact</span>

                {/* Mobile - horizontal slide effect */}
                <span className="sm:hidden relative inline-flex items-center min-w-[5.5rem]">
                  {/* Contact - slides out to right */}
                  <span
                    className={`absolute left-0 text-white transition-all duration-500 ease-out ${
                      isPastHome
                        ? "translate-x-[150%] opacity-0"
                        : "translate-x-0 opacity-100"
                    }`}
                  >
                    Contact
                  </span>
                  {/* Get In Touch - slides in from right */}
                  <span
                    className={`text-red-500 transition-all duration-500 ease-out whitespace-nowrap ${
                      isPastHome
                        ? "translate-x-0 opacity-100 animate-pulseGlow"
                        : "translate-x-[150%] opacity-0"
                    }`}
                  >
                    Get In Touch
                  </span>
                </span>
              </button>
            ) : (
              <button
                className={`relative text-white transition-all duration-300
                text-2xl sm:text-3xl md:text-4xl lg:text-5xl px-2 sm:px-3 font-bebas
                ${activeSection === section ? "after:w-full" : "after:w-0"}
                hover:after:w-full after:absolute after:left-0 after:bottom-[-2px] after:h-[1px] after:bg-white after:transition-all after:duration-300`}
                onClick={() => handleScroll(section)}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
