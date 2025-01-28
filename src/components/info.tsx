import React, { useEffect, useRef } from "react";

const Info: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry && entry.isIntersecting) {
          sectionRef.current?.classList.add("animate-fadeIn");
        } else {
          sectionRef.current?.classList.remove("animate-fadeIn");
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section
      id="info"
      ref={sectionRef}
      className="relative flex flex-col items-center justify-start text-center pt-32 pb-16 px-6 overflow-hidden"
    >
      {/* Background Effect */}
      <div className="absolute inset-0 opacity-30 z-[-1]"></div>

      {/* Title */}
      <h1 className="text-[10rem] font-bebas uppercase tracking-wide text-white opacity-0 animate-slideUp">
        Milosevich
      </h1>

      {/* Subtext */}
      <p className="text-2xl text-gray-400 font-bebas mt-4 opacity-0 animate-slideUp delay-300">
        No, it's not a sandwich. It's my last name.
      </p>

      {/* Description */}
      <p className="text-[1.9rem] text-beige max-w-[600px] opacity-0 animate-slideInLeft delay-700 leading-relaxed">
        Design meets functionality in my world of UI/UX development. I
        specialize in turning concepts into interactive experiences, balancing
        creativity with code to bring ideas to life. I love Nature, Food and
        Video Games—three passions that fuel my creativity in unexpected ways.
      </p>
    </section>
  );
};

export default Info;
