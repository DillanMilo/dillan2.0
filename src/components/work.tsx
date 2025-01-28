import React, { useEffect, useRef } from "react";

const Work: React.FC = () => {
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-slideUp");
          } else {
            entry.target.classList.remove("animate-slideUp");
          }
        });
      },
      { threshold: 0.2 }
    );

    projectRefs.current.forEach((project) => {
      if (project) observer.observe(project);
    });

    return () => {
      projectRefs.current.forEach((project) => {
        if (project) observer.unobserve(project);
      });
    };
  }, []);

  return (
    <section
      id="work"
      className="relative flex flex-col items-center text-center py-20 px-6"
    >
      {["Game Hub", "Reddit Mini", "Spotify App"].map((title, index) => (
        <div
          key={index}
          ref={(el) => (projectRefs.current[index] = el)}
          className="w-full max-w-3xl mb-8 opacity-0 transform translate-y-10 animate-slideUp"
        >
          <h2 className="text-4xl font-bebas text-red-600 mb-4 underline">
            <a
              href={`https://example-link-${index + 1}`}
              target="_blank"
              rel="noreferrer"
            >
              {title}
            </a>
          </h2>
          <p className="text-2xl text-gray-400">
            {title === "Game Hub"
              ? "A fun web app showcasing video games across platforms."
              : title === "Reddit Mini"
              ? "A bite-sized Reddit experience with dynamic content loading."
              : "A playlist builder with Spotify integration."}
          </p>
        </div>
      ))}
    </section>
  );
};

export default Work;
