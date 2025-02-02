import React, { useEffect, useState, useRef } from "react";

const Work: React.FC = () => {
  // Initialize animations for each project as false so that they animate on mount.
  const [animatedProjects, setAnimatedProjects] = useState<boolean[]>([
    false,
    false,
    false,
  ]);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Intersection Observer to trigger project animations when they come into view.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = projectRefs.current.findIndex(
            (project) => project === entry.target
          );
          if (index !== -1) {
            setAnimatedProjects((prev) => {
              const updated = [...prev];
              // Trigger animation only once for each project.
              if (entry.isIntersecting && !updated[index]) {
                updated[index] = true;
              }
              return updated;
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

  // Optional: If your SPA doesn't unmount the Work component on navigation,
  // uncomment the following useEffect to reset animations each time the work section becomes visible.
  /*
  useEffect(() => {
    const workSection = document.getElementById("work");
    const resetObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Reset all project animations so they replay on each visit.
            setAnimatedProjects(new Array(projects.length).fill(false));
          }
        });
      },
      { threshold: 0.1 }
    );
    if (workSection) resetObserver.observe(workSection);
    return () => {
      if (workSection) resetObserver.unobserve(workSection);
    };
  }, []);
  */

  // Define your project data.
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
          // Added lg:mb-16 for extra spacing on larger screens.
          className={`w-full max-w-3xl mb-8 lg:mb-16 transform transition-all duration-1500 ${
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
