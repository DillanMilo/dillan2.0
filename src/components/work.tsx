import React, { useEffect, useState, useRef } from "react";

const Work: React.FC = () => {
  const [animatedProjects, setAnimatedProjects] = useState<boolean[]>([
    false,
    false,
    false,
  ]);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = projectRefs.current.findIndex(
            (project) => project === entry.target
          );

          if (index !== -1) {
            setAnimatedProjects((prev) => {
              const updatedVisibility = [...prev];

              if (entry.isIntersecting && !updatedVisibility[index]) {
                updatedVisibility[index] = true; // Play animation only ONCE
              }

              return updatedVisibility;
            });
          }
        });
      },
      { threshold: 0.3 }
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

  // Define project data with their respective animations
  const projects = [
    {
      title: "Game Hub",
      description:
        "A fun web app showcasing video games across platforms - Like I said, I like video games.",
      link: "https://github.com/DillanMilo/game-hub",
      animation: "animate-slideInLeftToCenter",
      delay: "delay-[200ms]",
    },
    {
      title: "Reddit Mini",
      description:
        "A bite-sized Reddit experience with dynamic content loading—because dynamite comes in small packages.",
      link: "https://github.com/DillanMilo/reddit-mini",
      animation: "animate-slideInRightToCenter",
      delay: "delay-[600ms]",
    },
    {
      title: "Spotify App",
      description:
        "A playlist builder with Spotify integration—Silence isn't always golden.",
      link: "https://github.com/DillanMilo/Jamming-With-Spotify",
      animation: "animate-slideInLeftToCenter",
      delay: "delay-[1000ms]",
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
          className={`w-full max-w-3xl mb-8 transform transition-all duration-1500 ${
            animatedProjects[index]
              ? `${project.animation} ${project.delay} opacity-100`
              : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-5xl sm:text-4xl md:text-5xl font-bebas text-red-600 mb-6 underline">
            <a href={project.link} target="_blank" rel="noreferrer">
              {project.title}
            </a>
          </h2>
          <p className="text-3xl sm:text-2xl md:text-3xl text-white mb-8">
            {project.description}
          </p>
        </div>
      ))}
    </section>
  );
};

export default Work;
