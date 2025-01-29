import React, { useEffect, useRef } from "react";

const Work: React.FC = () => {
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-x-0");
          } else {
            entry.target.classList.remove("opacity-100", "translate-x-0");
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

  // Define project data with their respective links
  const projects = [
    {
      title: "Game Hub",
      description: "A fun web app showcasing video games across platforms.",
      link: "https://github.com/DillanMilo/game-hub",
      animation: "animate-slideInLeft",
    },
    {
      title: "Reddit Mini",
      description:
        "A bite-sized Reddit experience with dynamic content loading.",
      link: "https://github.com/DillanMilo/reddit-mini",
      animation: "animate-slideInRight",
    },
    {
      title: "Spotify App",
      description: "A playlist builder with Spotify integration.",
      link: "https://github.com/DillanMilo/Jamming-With-Spotify",
      animation: "animate-slideInLeft",
    },
  ];

  return (
    <section
      id="work"
      className="relative flex flex-col items-center text-center py-20 px-6"
    >
      {projects.map((project, index) => (
        <div
          key={index}
          ref={(el) => (projectRefs.current[index] = el)}
          className={`w-full max-w-3xl mb-8 opacity-0 transform ${project.animation}`}
        >
          <h2 className="text-6xl font-bebas text-red-600 mb-4 underline">
            <a href={project.link} target="_blank" rel="noreferrer">
              {project.title}
            </a>
          </h2>
          <p className="text-4xl text-white mb-10">{project.description}</p>
        </div>
      ))}
    </section>
  );
};

export default Work;
