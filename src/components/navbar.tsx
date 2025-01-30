import React, { useState, useEffect } from "react";

const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("home");

  // State to control navbar animation
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Delay navbar appearance by 2000ms (2s)
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleScroll = (id: string) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleScrollSpy = () => {
    const sections = ["home", "info", "work", "contact"];
    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top >= 0 && rect.top < window.innerHeight / 2) {
          setActiveSection(section);
        }
      }
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScrollSpy);
    return () => window.removeEventListener("scroll", handleScrollSpy);
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
            <button
              className={`relative text-white transition-all duration-300 
              text-2xl sm:text-3xl md:text-4xl lg:text-5xl px-2 sm:px-3 font-bebas
              ${activeSection === section ? "after:w-full" : "after:w-0"} 
              hover:after:w-full after:absolute after:left-0 after:bottom-[-2px] after:h-[1px] after:bg-white after:transition-all after:duration-300`}
              onClick={() => handleScroll(section)}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
