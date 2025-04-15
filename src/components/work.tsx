// src/components/work.tsx
import React, { useEffect, useState, useRef } from "react";

// Move projects data outside component to prevent recreation on each render
const projects = [
  {
    title: "Game Hub",
    description:
      "A fun web app showcasing video games across platforms - Like I said, I like video games.",
    link: "https://game-hub-x.vercel.app/",
    animation: "animate-slideInLeftToCenter",
    delay: "delay-[200ms]",
  },
  {
    title: "Reddit Mini",
    description:
      "A bite-sized Reddit experience with dynamic content loading—because dynamite comes in small packages.",
    link: "https://reddit-mini-app.vercel.app/",
    animation: "animate-slideInRightToCenter",
    delay: "delay-[600ms]",
  },
  {
    title: "Spotify App",
    description:
      "A playlist builder with Spotify integration—Silence isn't always golden.",
    animation: "animate-slideInLeftToCenter",
    delay: "delay-[1000ms]",
  },
] as const;

const Work: React.FC = () => {
  // Set meta data for the Work page without Helmet
  useEffect(() => {
    document.title = "Work & Projects | Dillan Milosevich";

    const metaTags = {
      description:
        "Explore Dillan Milosevich's portfolio featuring innovative web development projects, including Game Hub, Reddit Mini, and Spotify integrations.",
      keywords:
        "Web Development Projects, Game Hub, Reddit Mini, Spotify App, Portfolio, Front-End Development, UI/UX Projects",
      author: "Dillan Milosevich",
      "og:title": "Work & Projects | Dillan Milosevich",
      "og:description":
        "Discover creative web development projects by Dillan Milosevich. From gaming platforms to social media integrations.",
      "og:type": "website",
      "og:url": window.location.href,
      "twitter:card": "summary_large_image",
      "twitter:title": "Work & Projects | Dillan Milosevich",
      "twitter:description":
        "Discover creative web development projects by Dillan Milosevich. From gaming platforms to social media integrations.",
      robots: "index, follow",
      canonical: window.location.href,
    };

    const updateMetaTag = (name: string, content: string) => {
      let metaTag =
        document.querySelector(`meta[name='${name}']`) ||
        document.querySelector(`meta[property='${name}']`);

      if (metaTag) {
        metaTag.setAttribute("content", content);
      } else {
        metaTag = document.createElement("meta");
        if (name.startsWith("og:")) {
          metaTag.setAttribute("property", name);
        } else {
          metaTag.setAttribute("name", name);
        }
        metaTag.setAttribute("content", content);
        document.head.appendChild(metaTag);
      }
    };

    // Create or update canonical link
    let canonicalLink = document.querySelector("link[rel='canonical']");
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", metaTags.canonical);

    // Apply all meta tags
    Object.entries(metaTags).forEach(([name, content]) => {
      updateMetaTag(name, content);
    });
  }, []);

  // State to track if each project has animated.
  const [animatedProjects, setAnimatedProjects] = useState<boolean[]>(
    new Array(projects.length).fill(false)
  );
  // State to detect if the Work section is visible.
  const [workVisible, setWorkVisible] = useState(false);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Reset project animations each time the Work section becomes visible.
  useEffect(() => {
    const workSection = document.getElementById("work");
    if (!workSection) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !workVisible) {
            setWorkVisible(true);
            // Reset all project animations so they replay on each visit.
            setAnimatedProjects(new Array(projects.length).fill(false));
          } else if (!entry.isIntersecting && workVisible) {
            setWorkVisible(false);
          }
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(workSection);
    return () => {
      observer.disconnect();
    };
  }, [workVisible, projects.length]);

  // Intersection Observer to trigger animations for each project.
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

  return (
    <section
      id="work"
      className="relative flex flex-col items-center text-center py-20 px-6"
    >
      {projects.map((project, index) => (
        <div
          key={index}
          ref={(el) => (projectRefs.current[index] = el)}
          className={`w-full max-w-3xl mb-8 lg:mb-24 transform transition-all duration-1500 ${
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
