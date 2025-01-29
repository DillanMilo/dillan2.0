import React, { useEffect, useRef } from "react";

const Info: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          sectionRef.current
            ?.querySelector("h1")
            ?.classList.add("animate-expandText");
          sectionRef.current?.querySelectorAll("p").forEach((p, index) => {
            const delayClass = index === 0 ? "delay-[300ms]" : "delay-[700ms]";
            p.classList.add("animate-fadeIn", delayClass);
          });
        } else {
          sectionRef.current
            ?.querySelector("h1")
            ?.classList.remove("animate-expandText");
          sectionRef.current?.querySelectorAll("p").forEach((p) => {
            p.classList.remove(
              "animate-fadeIn",
              "delay-[300ms]",
              "delay-[700ms]"
            );
          });
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

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
      {/* Title with Expand Animation */}
      <h1 className="text-[11rem] font-bebas uppercase tracking-wide text-white opacity-0">
        Milosevich
      </h1>

      {/* Subtext */}
      <p className="text-2xl text-gray-400 font-bebas mt-4 opacity-0">
        No, it's not a sandwich. It's my last name.
      </p>

      {/* Description */}
      <p className="text-[2.5rem] text-beige max-w-[600px] opacity-0 leading-relaxed">
        Design meets functionality in my world of UI/UX development. I
        specialize in turning concepts into interactive experiences, balancing
        creativity with code to bring ideas to life. I love Nature, Food, and
        Video Games—three passions that fuel my creativity in unexpected ways.
      </p>
    </section>
  );
};

export default Info;
