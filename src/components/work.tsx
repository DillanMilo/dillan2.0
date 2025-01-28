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
      { threshold: 0.2 } // Adjusted for smoother visibility
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
    <div className="relative flex flex-col items-center text-center px-6 py-12 w-full">
      {["Game Hub", "Reddit Mini", "Spotify App"].map((title, index) => (
        <div
          key={index}
          ref={(el) => (projectRefs.current[index] = el)}
          className="w-full max-w-[800px] mx-auto my-8 opacity-0 transform translate-y-12 transition-all duration-1000 ease-in-out"
        >
          {/* Project Title */}
          <h2 className="text-4xl font-bebas mb-4 underline text-red-600 hover:text-red-400 transition-colors duration-300">
            <a
              href={`https://example-link-${index + 1}`}
              target="_blank"
              rel="noreferrer"
            >
              {title}
            </a>
          </h2>

          {/* Project Description */}
          <p className="text-2xl text-gray-400 font-bebas">
            {title === "Game Hub"
              ? "A fun web app showcasing video games across platforms."
              : title === "Reddit Mini"
              ? "A bite-sized Reddit experience with dynamic content loading."
              : "A playlist builder with Spotify integration."}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Work;
