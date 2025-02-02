import React, { useEffect, useRef, useState } from "react";

const rotatingWords = [
  "UI",
  "UX",
  "Design",
  "Functionality",
  "Responsive Design",
  "Web Development",
  "Videogames",
];

const Contact: React.FC = () => {
  const handlesRef = useRef<HTMLDivElement>(null);
  const [visibleIndex, setVisibleIndex] = useState(0);

  // Rotate words every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleIndex((prevIndex) => (prevIndex + 1) % rotatingWords.length);
    }, 1500);

    return () => clearInterval(interval);
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
      className="relative h-screen flex flex-col justify-start items-center text-center pt-20 bg-cover bg-center bg-fixed text-white px-4 sm:px-6"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/src/assets/8xq1yhiw09q41.jpg')",
      }}
    >
      {/* Caption - Adjusted for Mobile */}
      <div className="mt-66 sm:mt-40">
        <h2 className="text-5xl sm:text-8xl md:text-6xl font-bebas tracking-wide animate-fadeIn">
          Let’s connect and chat about
        </h2>

        {/* Slot Machine Effect - Adjusted for Mobile */}
        <div className="relative h-[6rem] sm:h-[6rem] md:h-[6rem] flex justify-center items-center overflow-hidden w-auto">
          <div className="relative w-full h-full flex items-center justify-center">
            {rotatingWords.map((word, index) => (
              <span
                key={index}
                className={`absolute inset-0 flex items-center justify-center min-w-[max-content] text-7xl sm:text-6xl md:text-10xl font-bebas text-paleRed transition duration-1000 ease-in-out ${
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

      {/* Contact Handles - Positioned in a row at the bottom */}
      <div
        ref={handlesRef}
        className="absolute bottom-5 sm:bottom-6 gap-5 left-1/2 transform -translate-x-1/2 flex flex-nowrap items-center sm:gap-6 px-4 overflow-x-auto max-w-screen-lg whitespace-nowrap transition-opacity duration-1000 opacity-0 animate-fadeIn"
      >
        {[
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
        ].map((handle, index) => (
          <a
            key={index}
            href={handle.link}
            target="_blank"
            rel="noreferrer"
            className="text-2xl  sm:text-3xl md:text-5xl font-bebas text-red-600 transition-all duration-300 hover:text-red-400 whitespace-nowrap"
          >
            {handle.name}
          </a>
        ))}
      </div>
    </section>
  );
};

export default Contact;
