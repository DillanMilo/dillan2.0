import React, { useEffect, useState, useRef } from "react";

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
  const [currentWord, setCurrentWord] = useState(0);
  const handlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prevWord) => (prevWord + 1) % rotatingWords.length);
    }, 1500); // Change word every 1.5 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            handlesRef.current?.classList.add("animate-slideInLeftToCenter");
          } else {
            handlesRef.current?.classList.remove("animate-slideInLeftToCenter");
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
      className="relative h-screen flex flex-col justify-start items-center text-center pt-20 bg-cover bg-center bg-fixed text-white"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/src/assets/8xq1yhiw09q41.jpg')",
      }}
    >
      {/* Caption */}
      <div className="mt-50">
        <h2 className="text-6xl font-bebas tracking-wide animate-fadeIn">
          Let’s connect and chat about
        </h2>
        <div className="relative h-[6rem] flex justify-center items-center overflow-hidden">
          <span className="text-7xl font-bebas text-paleRed animate-slotMachine">
            {rotatingWords[currentWord]}
          </span>
        </div>
      </div>

      {/* Contact Handles */}
      <div
        ref={handlesRef}
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-wrap justify-center gap-10 opacity-0"
      >
        {[
          {
            name: "LinkedIn",
            link: "https://linkedin.com/in/dillanmilosevich",
          },
          { name: "X", link: "https://twitter.com/yourhandle" },
          { name: "Email", link: "mailto:dillanxx@icloud.com" },
          { name: "GitHub", link: "https://github.com/DillanMilo" },
          { name: "ENS", link: "https://app.ens.domains/dillanxx.eth" },
          { name: "SNS", link: "https://www.sns.id/domain?domain=dillanxx" },
          { name: "BNS", link: "https://app.ens.domains/dillanxx.base.eth" },
          { name: "Call", link: "tel:+12812108139" },
        ].map((handle, index) => (
          <a
            key={index}
            href={handle.link}
            target="_blank"
            rel="noreferrer"
            className="text-5xl font-bebas text-red-600 transition-all duration-300 hover:text-red-400"
          >
            {handle.name}
          </a>
        ))}
      </div>
    </section>
  );
};

export default Contact;
