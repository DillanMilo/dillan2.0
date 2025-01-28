import React, { useState, useEffect } from "react";

const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("home");

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
    <nav className="fixed top-4 right-5 z-50 flex justify-end">
      <ul className="flex gap-4 sm:gap-2">
        {["info", "work", "contact"].map((section) => (
          <li key={section}>
            <button
              className={`relative text-white transition-all duration-300 text-4xl sm:text-2xl md:text-3xl lg:text-5xl px-3 font-bebas
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
