import "./styles/index.css";
import Navbar from "./components/navbar";
import Home from "./components/home";
import SEOBreadcrumbs from "./components/SEOBreadcrumbs";
import FloatingCTA from "./components/FloatingCTA";
import { useEffect, useState, lazy, Suspense } from "react";
import { Analytics } from "@vercel/analytics/react"; // Added Vercel Analytics import

// Lazy load non-critical components
const Info = lazy(() => import("./components/info"));
const Work = lazy(() => import("./components/work"));
const Contact = lazy(() => import("./components/contact"));

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

    // Add loaded class immediately for faster background loading
    document.body.classList.add("loaded");
  }, []);

  // Define breadcrumb items based on active section
  const getBreadcrumbs = () => {
    const base = [{ name: "Home", url: "https://dillanmilo.com/" }];

    switch (activeSection) {
      case "info":
        return [
          ...base,
          { name: "About", url: "https://dillanmilo.com/#info" },
        ];
      case "work":
        return [
          ...base,
          { name: "Portfolio", url: "https://dillanmilo.com/#work" },
        ];
      case "contact":
        return [
          ...base,
          { name: "Contact", url: "https://dillanmilo.com/#contact" },
        ];
      default:
        return base;
    }
  };

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
          <SEOBreadcrumbs items={getBreadcrumbs()} />
          <Navbar />
          <FloatingCTA />
          {/* Skip link for keyboard navigation */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-red-600 focus:text-white focus:rounded"
          >
            Skip to main content
          </a>
          <section
            id="home"
            aria-label="Home - Introduction"
            className={`transition-opacity duration-700 ease-in-out ${
              activeSection === "home" ? "opacity-100" : "opacity-60"
            }`}
          >
            <Home />
          </section>
          <Suspense
            fallback={
              <div className="h-screen flex items-center justify-center text-white">
                Loading...
              </div>
            }
          >
            <section
              id="info"
              aria-label="About Dillan Milosevich"
              className={`transition-opacity duration-700 ease-in-out ${
                activeSection === "info" ? "opacity-100" : "opacity-60"
              }`}
            >
              <Info />
            </section>
          </Suspense>
          <Suspense
            fallback={
              <div className="h-screen flex items-center justify-center text-white">
                Loading...
              </div>
            }
          >
            <section
              id="work"
              aria-label="Portfolio Projects"
              className={`transition-opacity duration-700 ease-in-out ${
                activeSection === "work" ? "opacity-100" : "opacity-60"
              }`}
            >
              <div id="main-content" />
              <Work />
            </section>
          </Suspense>
          <Suspense
            fallback={
              <div className="h-screen flex items-center justify-center text-white">
                Loading...
              </div>
            }
          >
            <section
              id="contact"
              aria-label="Contact and Social Links"
              className={`transition-opacity duration-700 ease-in-out ${
                activeSection === "contact" ? "opacity-100" : "opacity-60"
              }`}
            >
              <Contact />
            </section>
          </Suspense>
        </>
      )}
      {/* Vercel Analytics Component - Added at the end so it renders on every page */}
      <Analytics />
    </div>
  );
}

export default App;
