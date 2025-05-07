// src/components/work.tsx
import React, { useEffect, useState, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { getProjectsSchema } from "../utils/schema";

// Add this before the projects array
interface Project {
  title: string;
  description: string;
  link: string;
  animation: string;
  delay: string;
  isDropdown?: boolean;
  dropdownItems?: Array<{ name: string; link: string }>;
}

const projects: Project[] = [
  {
    title: "Africa Wild Ventures",
    description:
      "Bringing the Big Five to your browser—elephantine performance with cheetah-fast load times. Africa's calling, and it has great UX. (Currently in development)",
    link: "https://africa-wild-ventures.vercel.app",
    animation: "animate-slideInLeftToCenter",
    delay: "delay-[200ms]",
  },
  {
    title: "Professional Bio's",
    description:
      "Impactful, bespoke single-page applications for professionals. Coz business cards are lame.",
    link: "#",
    animation: "animate-slideInRightToCenter",
    delay: "delay-[600ms]",
    isDropdown: true,
    dropdownItems: [
      {
        name: "Carly Milo",
        link: "https://carly-milo.com",
      },
      {
        name: "Chad Hanekom",
        link: "https://chadhanekom.com",
      },

      {
        name: "Richard Nell",
        link: "https://richard-nell.vercel.app",
      },
      // Add more items as you create more professional bios
    ],
  },
  {
    title: "Game Hub",
    description:
      "A fun web app showcasing video games across platforms - Like I said, I like video games.",
    link: "https://game-hub-x.vercel.app/",
    animation: "animate-slideInLeftToCenter",
    delay: "delay-[1000ms]",
  },
] as const;

const Work: React.FC = () => {
  useEffect(() => {
    const metaTags = {
      description:
        "Explore Dillan Milosevich's portfolio of web development projects - from game platforms to professional websites and React applications built by a software engineer with front-end expertise.",
      keywords:
        "Web Development Projects, Software Engineering, Front-End Development, Game Hub, Reddit Mini, Professional Websites, Portfolio, UI/UX Projects, React Applications",
      "og:title": "Projects & Work | Dillan Milosevich | Software Engineer",
      "og:description":
        "Discover innovative web applications and professional websites crafted by Dillan Milosevich, a software engineer specializing in front-end development. Featured projects include Game Hub, Reddit Mini, and professional bio pages.",
      "og:type": "website",
      "og:url": window.location.href,
      robots: "index, follow",
      canonical: window.location.href,
    };

    // Update meta tags
    document.title = "Work & Projects | Dillan Milosevich";
    Object.entries(metaTags).forEach(([name, content]) => {
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
    });

    // Add projects schema
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(getProjectsSchema());
    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  // State to track if each project has animated.
  const [animatedProjects, setAnimatedProjects] = useState<boolean[]>(
    new Array(projects.length).fill(false)
  );
  // State to detect if the Work section is visible.
  const [workVisible, setWorkVisible] = useState(false);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Add state for subtext animation
  const [subtextVisible, setSubtextVisible] = useState(false);

  // Reset project animations each time the Work section becomes visible.
  useEffect(() => {
    const workSection = document.getElementById("work");
    if (!workSection) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !workVisible) {
            setWorkVisible(true);
            setSubtextVisible(true);
            setAnimatedProjects(new Array(projects.length).fill(false));
          } else if (!entry.isIntersecting && workVisible) {
            setWorkVisible(false);
            setSubtextVisible(false);
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

  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  const toggleDropdown = (index: number) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  return (
    <section
      id="work"
      className="relative flex flex-col items-center text-center py-20 px-6"
    >
      <p
        className={`text-2xl sm:text-3xl text-gray-400 font-bebas mb-16 transform transition-all duration-1000 ${
          subtextVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        Don't be shy, click around...
      </p>
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
          <h2
            className={`text-5xl sm:text-4xl md:text-5xl font-bebas text-red-600 mb-6 underline cursor-pointer
              ${
                project.isDropdown
                  ? "hover:text-red-400 transition-colors duration-300"
                  : ""
              }`}
            onClick={() => (project.isDropdown ? toggleDropdown(index) : null)}
          >
            {project.isDropdown ? (
              <span className="flex items-center justify-center gap-2">
                {project.title}
                <ChevronDown
                  className={`h-8 w-8 transition-transform duration-300 ${
                    openDropdown === index ? "rotate-180" : ""
                  }`}
                />
              </span>
            ) : (
              <a href={project.link} target="_blank" rel="noreferrer">
                {project.title}
              </a>
            )}
          </h2>
          <p className="text-3xl sm:text-2xl md:text-3xl text-white mb-8">
            {project.description}
          </p>

          {/* Dropdown Content */}
          {project.isDropdown && project.dropdownItems && (
            <div
              className={`transition-all duration-500 ease-in-out overflow-hidden ${
                openDropdown === index
                  ? "max-h-96 opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              {project.dropdownItems.map((item, i) => (
                <a
                  key={i}
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  className="block text-3xl font-bebas text-red-600 hover:text-red-400 transition-colors duration-300 py-2"
                >
                  {item.name}
                </a>
              ))}
            </div>
          )}
        </div>
      ))}
    </section>
  );
};

export default Work;
