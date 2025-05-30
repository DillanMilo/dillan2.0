import "./styles/index.css";
import Navbar from "./components/navbar";
import Home from "./components/home";
import Info from "./components/info";
import Work from "./components/work";
import Contact from "./components/contact";
import { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/react"; // Added Vercel Analytics import

function App() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [isLandscape, setIsLandscape] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      let foundActive = false;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const dimmingThreshold = window.innerHeight * 0.8;

        if (!foundActive && rect.top >= -200 && rect.top < dimmingThreshold) {
          setActiveSection(section.id);
          foundActive = true;
        }
      });

      if (!foundActive) {
        setActiveSection(null);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Run on mount to detect initial section

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleOrientationChange = () => {
      setIsLandscape(
        window.matchMedia("(orientation: landscape) and (max-width: 1024px)")
          .matches
      );
    };

    handleOrientationChange(); // Check on mount
    window.addEventListener("resize", handleOrientationChange);

    return () => {
      window.removeEventListener("resize", handleOrientationChange);
    };
  }, []);

  useEffect(() => {
    document.documentElement.lang = "en";
  }, []);

  return (
    <div className="min-h-screen text-white">
      {/* ✅ Mobile Landscape Overlay (Hides SPA when in landscape mode) */}
      {isLandscape && (
        <div className="fixed inset-0 bg-black flex items-center justify-center text-red-600 text-center z-50 opacity-0 animate-fadeIn">
          <p className="text-2xl md:text-3xl font-bebas tracking-wide">
            No no, turn your phone upright for the best experience ;)
          </p>
        </div>
      )}

      {/* ✅ Main Content (Hidden in Mobile Landscape Mode) */}
      {!isLandscape && (
        <>
          <Navbar />
          <section
            id="home"
            className={`transition-opacity duration-700 ease-in-out ${
              activeSection === "home" ? "opacity-100" : "opacity-60"
            }`}
          >
            <Home />
          </section>
          <section
            id="info"
            className={`transition-opacity duration-700 ease-in-out ${
              activeSection === "info" ? "opacity-100" : "opacity-60"
            }`}
          >
            <Info />
          </section>
          <section
            id="work"
            className={`transition-opacity duration-700 ease-in-out ${
              activeSection === "work" ? "opacity-100" : "opacity-60"
            }`}
          >
            <Work />
          </section>
          <section
            id="contact"
            className={`transition-opacity duration-700 ease-in-out ${
              activeSection === "contact" ? "opacity-100" : "opacity-60"
            }`}
          >
            <Contact />
          </section>
        </>
      )}
      {/* Vercel Analytics Component - Added at the end so it renders on every page */}
      <Analytics />
    </div>
  );
}

export default App;
