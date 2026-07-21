import "./styles/index.css";
import Navbar from "./components/navbar";
import Home from "./components/home";
import FloatingCTA from "./components/FloatingCTA";
import { useEffect, useRef, useState, lazy, Suspense } from "react";
import { Analytics } from "@vercel/analytics/react"; // Added Vercel Analytics import
import { trackSectionView } from "./utils/analytics";

// Lazy load non-critical components
const Info = lazy(() => import("./components/info"));
const Work = lazy(() => import("./components/work"));
const Contact = lazy(() => import("./components/contact"));

function App() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);
  const viewedSections = useRef<Set<string>>(new Set());

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]");
      let foundActive = false;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const viewH = window.innerHeight;
        const dimmingThreshold = viewH * 0.8;

        // Track active section for breadcrumbs
        if (!foundActive && rect.top < dimmingThreshold && rect.bottom > 200) {
          setActiveSection(section.id);
          foundActive = true;
        }
      });

      if (!foundActive) {
        setActiveSection(null);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.lang = "en";

    // Add loaded class immediately for faster background loading
    document.body.classList.add("loaded");
    setAnalyticsEnabled(
      !["localhost", "127.0.0.1"].includes(window.location.hostname)
    );
  }, []);

  useEffect(() => {
    if (!activeSection || viewedSections.current.has(activeSection)) return;
    viewedSections.current.add(activeSection);
    trackSectionView(activeSection);
  }, [activeSection]);

  return (
    <div className="min-h-screen text-white">
      <Navbar />
      <FloatingCTA />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-red-600 focus:text-white focus:rounded"
      >
        Skip to main content
      </a>
      <section
        id="home"
        aria-label="Home - Introduction"
      >
        <Home />
      </section>
      <Suspense fallback={<div className="h-screen" aria-hidden="true" />}>
        <section
          id="info"
          aria-label="About Dillan Milosevich"
        >
          <Info />
        </section>
      </Suspense>
      <Suspense fallback={<div className="h-screen" aria-hidden="true" />}>
        <section
          id="work"
          aria-label="Portfolio Projects"
        >
          <Work />
        </section>
      </Suspense>
      <Suspense fallback={<div className="h-screen" aria-hidden="true" />}>
        <section
          id="contact"
          aria-label="Contact and Social Links"
        >
          <Contact />
        </section>
      </Suspense>
      {/* Vercel Analytics Component - Added at the end so it renders on every page */}
      {analyticsEnabled && <Analytics />}
    </div>
  );
}

export default App;
