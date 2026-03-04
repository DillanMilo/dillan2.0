import React, { useEffect, useRef } from "react";

const Info: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          // Query for h2 (since we're using an H2 for the title)
          sectionRef.current
            ?.querySelector("h2")
            ?.classList.add("animate-expandText");
          sectionRef.current?.querySelectorAll("p").forEach((p, index) => {
            const delayClass = index === 0 ? "delay-[400ms]" : "delay-[600ms]";
            p.classList.add("animate-fadeIn", delayClass);
          });
        } else {
          sectionRef.current
            ?.querySelector("h2")
            ?.classList.remove("animate-expandText");
          sectionRef.current?.querySelectorAll("p").forEach((p) => {
            p.classList.remove(
              "animate-fadeIn",
              "delay-[400ms]",
              "delay-[600ms]"
            );
          });
        }
      },
      { threshold: 0.5 }
    );

    const currentSection = sectionRef.current;
    if (currentSection) observer.observe(currentSection);

    return () => {
      if (currentSection) observer.unobserve(currentSection);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col items-center justify-start text-center pt-22 pb-16 px-6 overflow-hidden"
    >
      {/* Title with Expand Animation */}
      <h2 className="text-[3.5rem] sm:text-[6rem] md:text-[10rem] lg:text-[11rem] font-bebas uppercase tracking-normal sm:tracking-wide text-white opacity-0 w-full">
        MILOSEVICH
      </h2>

      {/* Subtext */}
      <p className="text-xl sm:text-2xl md:text-2xl text-gray-400 font-bebas mt-4 opacity-0">
        The name's long, but my load times aren't.
      </p>

      {/* Description */}
      <p className="text-white text-[1.6rem] mt-10 mb-10 sm:text-[2rem] md:text-[2.5rem] font-bebas max-w-[600px] opacity-0 leading-relaxed">
        I treat UI like a good joke — if you have to explain it, it's not
        working. Beyond design and code, I specialize in building custom AI
        tools, automation workflows, and small business software that spot where
        your business is bleeding time or money, then patch it up — quietly
        making you more efficient while you're busy doing your thing. Fueled by
        coffee, gaming, and the occasional existential crisis, I make sure your
        digital presence is fast, functional, and unforgettable.
      </p>
    </section>
  );
};

export default Info;
