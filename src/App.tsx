import "./styles/index.css";
import Navbar from "./components/navbar";
import Home from "./components/home";
import Info from "./components/info";
import Work from "./components/work";
import Contact from "./components/contact";
import { useEffect, useState } from "react";

function App() {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      let foundActive = false;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();

        // Adjust this threshold to control when the dimming starts
        const dimmingThreshold = window.innerHeight * 1; // Change this value to delay dimming

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

  return (
    <div
      className="min-h-screen text-white bg-cover bg-center bg-fixed"
      style={{ backgroundImage: "url('/src/assets/IMG_06902.jpg')" }}
    >
      <Navbar />
      <section
        id="home"
        className={`transition-opacity duration-500 ${
          activeSection === "home" ? "opacity-100" : "opacity-60"
        }`}
      >
        <Home />
      </section>
      <section
        id="info"
        className={`transition-opacity duration-500 ${
          activeSection === "info" ? "opacity-100" : "opacity-60"
        }`}
      >
        <Info />
      </section>
      <section
        id="work"
        className={`transition-opacity duration-500 ${
          activeSection === "work" ? "opacity-100" : "opacity-60"
        }`}
      >
        <Work />
      </section>
      <section
        id="contact"
        className={`transition-opacity duration-500 ${
          activeSection === "contact" ? "opacity-100" : "opacity-60"
        }`}
      >
        <Contact />
      </section>
    </div>
  );
}

export default App;
