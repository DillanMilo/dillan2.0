// src/components/work.tsx
import React, { useEffect, useState, useRef, useCallback } from "react";
import { ChevronDown, ArrowUpRight, ExternalLink } from "lucide-react";
import { getProjectsSchema } from "../utils/schema";

interface Project {
  title: string;
  description: string;
  link: string;
  gradient: string;
  accentColor: string;
  tag: string;
  isDropdown?: boolean;
  dropdownItems?: Array<{ name: string; link: string }>;
}

const projects: Project[] = [
  {
    title: "A5 Rail",
    description:
      "Next-level AR/VR training for rail pros. Slick, fast, secure — looks so good you might actually enjoy compliance.",
    link: "https://www.a5rail.com",
    gradient:
      "radial-gradient(ellipse at 30% 20%, #1a1a2e 0%, #16213e 40%, #0f3460 100%)",
    accentColor: "#0f3460",
    tag: "AR / VR",
  },
  {
    title: "Africa WildVentures",
    description:
      "Elephantine performance with cheetah-fast load times. Africa's calling, and it has great UX.",
    link: "https://www.africawildventures.com",
    gradient:
      "radial-gradient(ellipse at 70% 80%, #1a120b 0%, #3c2a21 40%, #d4a574 100%)",
    accentColor: "#d4a574",
    tag: "Travel",
  },
  {
    title: "FORME",
    description:
      "Regenerative medicine meets pixel-perfect design. Your platelets deserve a website this good.",
    link: "https://www.formeprp.com",
    gradient:
      "radial-gradient(ellipse at 50% 30%, #0a0a0a 0%, #1a1a1a 40%, #2d1f3d 100%)",
    accentColor: "#8b5cf6",
    tag: "Medical",
  },
  {
    title: "Professional Bios",
    description:
      "Impactful, bespoke single-page applications for professionals. Coz business cards are lame.",
    link: "#",
    gradient:
      "radial-gradient(ellipse at 20% 50%, #0f0f0f 0%, #1c1917 40%, #44403c 100%)",
    accentColor: "#f59e0b",
    tag: "Branding",
    isDropdown: true,
    dropdownItems: [
      { name: "Carly Milo", link: "https://carly-milo.com" },
      { name: "Chad Hanekom", link: "https://chadhanekom.com" },
      { name: "Richard Nell", link: "https://richard-nell.vercel.app" },
    ],
  },
  {
    title: "Game Hub",
    description:
      "A fun web app showcasing video games across platforms - Like I said, I like video games.",
    link: "https://game-hub-x.vercel.app/",
    gradient:
      "radial-gradient(ellipse at 80% 20%, #0c0c1d 0%, #1a0a2e 40%, #e11d48 100%)",
    accentColor: "#e11d48",
    tag: "Gaming",
  },
];

// Browser window chrome component
const BrowserFrame: React.FC<{
  project: Project;
  parallaxOffset: number;
  isMobile?: boolean;
}> = ({ project, parallaxOffset, isMobile }) => {
  return (
    <div className="relative w-full overflow-hidden rounded-lg border border-white/[0.08] shadow-2xl shadow-black/50">
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-[#0a0a0a] border-b border-white/[0.06]">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ef4444]" />
          <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
          <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
        </div>
        <div className="flex-1 mx-3">
          <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-white/[0.04] border border-white/[0.06] text-xs text-white/30 font-mono truncate">
            <span className="hidden sm:inline">https://</span>
            {project.link.replace("https://", "").replace("http://", "")}
          </div>
        </div>
      </div>

      {/* Viewport area with parallax gradient */}
      <div
        className="relative overflow-hidden"
        style={{ height: isMobile ? "280px" : "380px" }}
      >
        {/* Parallax background layer */}
        <div
          className="absolute inset-0 will-change-transform"
          style={{
            background: project.gradient,
            transform: `translate3d(${parallaxOffset * 0.3}px, 0, 0) scale(1.3)`,
            transition: "transform 0.1s linear",
          }}
        />

        {/* Noise/grain overlay for texture */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Floating accent element */}
        <div
          className="absolute w-32 h-32 rounded-full blur-3xl opacity-20"
          style={{
            background: project.accentColor,
            bottom: "20%",
            right: "15%",
            transform: `translate3d(${parallaxOffset * -0.15}px, 0, 0)`,
          }}
        />

        {/* Tag badge */}
        <div className="absolute top-4 right-4 z-10">
          <span
            className="px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-bebas rounded-full border"
            style={{
              color: project.accentColor,
              borderColor: `${project.accentColor}33`,
              backgroundColor: `${project.accentColor}0d`,
            }}
          >
            {project.tag}
          </span>
        </div>

        {/* Centered project initial as watermark */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="text-[12rem] sm:text-[16rem] font-bebas leading-none select-none opacity-[0.04]"
            style={{
              transform: `translate3d(${parallaxOffset * -0.2}px, 0, 0)`,
            }}
          >
            {project.title.charAt(0)}
          </span>
        </div>
      </div>
    </div>
  );
};

const Work: React.FC = () => {
  // SEO schema
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(getProjectsSchema());
    document.head.appendChild(script);
    return () => {
      if (script.parentNode) script.parentNode.removeChild(script);
    };
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [sectionVisible, setSectionVisible] = useState(false);

  // Check mobile breakpoint
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Section visibility
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setSectionVisible(entry.isIntersecting),
      { threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Horizontal scroll mapping (desktop only)
  const handleScroll = useCallback(() => {
    if (isMobile || !containerRef.current || !stickyRef.current) return;

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const scrollableHeight =
      container.offsetHeight - window.innerHeight;
    const scrolled = -rect.top;
    const progress = Math.max(0, Math.min(1, scrolled / scrollableHeight));

    setScrollProgress(progress);
    setActiveIndex(
      Math.min(
        projects.length - 1,
        Math.floor(progress * projects.length)
      )
    );
  }, [isMobile]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const toggleDropdown = (index: number) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  // Calculate per-card parallax offset based on scroll
  const getParallaxOffset = (index: number) => {
    if (isMobile) return 0;
    const cardProgress = scrollProgress * projects.length - index;
    return cardProgress * -120;
  };

  // MOBILE LAYOUT — vertical stacked cards
  if (isMobile) {
    return (
      <MobileWork
        sectionVisible={sectionVisible}
        containerRef={containerRef}
        openDropdown={openDropdown}
        toggleDropdown={toggleDropdown}
      />
    );
  }

  // DESKTOP LAYOUT — horizontal scroll showcase
  const totalScrollHeight = `${projects.length * 80}vh`;

  return (
    <div ref={containerRef} style={{ height: totalScrollHeight }}>
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen overflow-hidden"
      >
        <h2 className="sr-only">Portfolio & Projects</h2>

        {/* Cinematic top bar */}
        <div
          className={`absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-8 lg:px-16 py-6 transition-all duration-700 ${
            sectionVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-4"
          }`}
        >
          <p className="text-sm text-white/30 font-bebas tracking-[0.3em] uppercase">
            Selected Work
          </p>
          <p className="text-sm text-white/30 font-bebas tracking-[0.15em]">
            <span className="text-white/60">{String(activeIndex + 1).padStart(2, "0")}</span>
            <span className="mx-2">/</span>
            <span>{String(projects.length).padStart(2, "0")}</span>
          </p>
        </div>

        {/* Progress bar */}
        <div className="absolute top-0 left-0 right-0 h-[2px] z-30 bg-white/[0.04]">
          <div
            className="h-full bg-red-600 will-change-transform origin-left"
            style={{
              transform: `scaleX(${scrollProgress})`,
              transition: "transform 0.1s linear",
            }}
          />
        </div>

        {/* Horizontal sliding track */}
        <div
          className="flex h-full will-change-transform"
          style={{
            transform: `translate3d(${-scrollProgress * (projects.length - 1) * 100}vw, 0, 0)`,
            transition: "transform 0.1s linear",
            width: `${projects.length * 100}vw`,
          }}
        >
          {projects.map((project, index) => (
            <div
              key={index}
              className="w-screen h-full flex items-center shrink-0"
              style={{ padding: "0 6vw" }}
            >
              <div className="flex gap-10 lg:gap-16 items-center w-full max-w-[1400px] mx-auto">
                {/* Left side — Browser frame */}
                <div className="flex-1 min-w-0">
                  <BrowserFrame
                    project={project}
                    parallaxOffset={getParallaxOffset(index)}
                  />
                </div>

                {/* Right side — Project info */}
                <div
                  className="w-[320px] lg:w-[380px] shrink-0 flex flex-col justify-center"
                  style={{
                    transform: `translate3d(${getParallaxOffset(index) * -0.5}px, 0, 0)`,
                    transition: "transform 0.1s linear",
                  }}
                >
                  <div className="mb-4">
                    <span
                      className="inline-block w-8 h-[1px] mb-6"
                      style={{ background: project.accentColor }}
                    />
                    <h3 className="text-5xl lg:text-6xl xl:text-7xl font-bebas text-white leading-[0.9] mb-4">
                      {project.title}
                    </h3>
                    <p className="text-base lg:text-lg text-white/50 leading-relaxed font-sans">
                      {project.description}
                    </p>
                  </div>

                  {/* Dropdown for Professional Bios */}
                  {project.isDropdown && project.dropdownItems ? (
                    <div className="mt-6">
                      <button
                        type="button"
                        aria-expanded={openDropdown === index}
                        onClick={() => toggleDropdown(index)}
                        className="group flex items-center gap-3 text-red-500 hover:text-red-400 transition-colors duration-300 cursor-pointer bg-transparent border-none p-0"
                      >
                        <span className="text-lg font-bebas tracking-wider uppercase">
                          View Projects
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-300 ${
                            openDropdown === index ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      <div
                        className={`overflow-hidden transition-all duration-500 ease-out ${
                          openDropdown === index
                            ? "max-h-60 opacity-100 mt-4"
                            : "max-h-0 opacity-0 mt-0"
                        }`}
                      >
                        <div className="flex flex-col gap-2 pl-4 border-l border-white/10">
                          {project.dropdownItems.map((item, i) => (
                            <a
                              key={i}
                              href={item.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group/link flex items-center gap-2 text-white/60 hover:text-red-400 transition-colors duration-300 py-1"
                            >
                              <span className="text-lg font-bebas tracking-wide">
                                {item.name}
                              </span>
                              <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-y-0.5 translate-x-[-2px] group-hover/link:opacity-100 group-hover/link:translate-y-0 group-hover/link:translate-x-0 transition-all duration-300" />
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group mt-6 inline-flex items-center gap-3 text-red-500 hover:text-red-400 transition-colors duration-300"
                    >
                      <span className="text-lg font-bebas tracking-wider uppercase">
                        Visit Site
                      </span>
                      <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
          {projects.map((_, index) => (
            <button
              key={index}
              aria-label={`Go to project ${index + 1}`}
              className="group relative p-1 cursor-pointer bg-transparent border-none"
              onClick={() => {
                if (!containerRef.current) return;
                const scrollableHeight =
                  containerRef.current.offsetHeight - window.innerHeight;
                const targetScroll =
                  containerRef.current.offsetTop +
                  (index / projects.length) * scrollableHeight;
                window.scrollTo({ top: targetScroll, behavior: "smooth" });
              }}
            >
              <div
                className={`h-[3px] rounded-full transition-all duration-500 ${
                  index === activeIndex
                    ? "w-8 bg-red-500"
                    : "w-3 bg-white/20 group-hover:bg-white/40"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// ——————————————————————————————————————
// MOBILE LAYOUT
// ——————————————————————————————————————
const MobileWork: React.FC<{
  sectionVisible: boolean;
  containerRef: React.RefObject<HTMLDivElement | null>;
  openDropdown: number | null;
  toggleDropdown: (index: number) => void;
}> = ({ sectionVisible, containerRef, openDropdown, toggleDropdown }) => {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [visibleCards, setVisibleCards] = useState<boolean[]>(
    new Array(projects.length).fill(false)
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = cardRefs.current.indexOf(
            entry.target as HTMLDivElement
          );
          if (idx !== -1 && entry.isIntersecting) {
            setVisibleCards((prev) => {
              const next = [...prev];
              next[idx] = true;
              return next;
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    cardRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="py-16 px-5">
      <h2 className="sr-only">Portfolio & Projects</h2>

      {/* Section header */}
      <div
        className={`text-center mb-12 transition-all duration-700 ${
          sectionVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-6"
        }`}
      >
        <p className="text-xs text-white/30 font-bebas tracking-[0.3em] uppercase mb-2">
          Selected Work
        </p>
        <div className="w-8 h-[1px] bg-red-600 mx-auto" />
      </div>

      {/* Stacked cards */}
      <div className="flex flex-col gap-10">
        {projects.map((project, index) => (
          <div
            key={index}
            ref={(el) => { cardRefs.current[index] = el; }}
            className={`transition-all duration-700 ease-out ${
              visibleCards[index]
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-12"
            }`}
            style={{ transitionDelay: `${index * 80}ms` }}
          >
            {/* Browser frame */}
            <BrowserFrame project={project} parallaxOffset={0} isMobile />

            {/* Project info below the frame */}
            <div className="mt-5 px-1">
              <h3 className="text-3xl font-bebas text-white mb-2 leading-tight">
                {project.title}
              </h3>
              <p className="text-sm text-white/40 leading-relaxed font-sans mb-4">
                {project.description}
              </p>

              {project.isDropdown && project.dropdownItems ? (
                <div>
                  <button
                    type="button"
                    aria-expanded={openDropdown === index}
                    onClick={() => toggleDropdown(index)}
                    className="flex items-center gap-2 text-red-500 cursor-pointer bg-transparent border-none p-0"
                  >
                    <span className="text-sm font-bebas tracking-wider uppercase">
                      View Projects
                    </span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-300 ${
                        openDropdown === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-500 ease-out ${
                      openDropdown === index
                        ? "max-h-48 opacity-100 mt-3"
                        : "max-h-0 opacity-0 mt-0"
                    }`}
                  >
                    <div className="flex flex-col gap-1.5 pl-3 border-l border-white/10">
                      {project.dropdownItems.map((item, i) => (
                        <a
                          key={i}
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-white/50 text-sm font-bebas tracking-wide py-0.5"
                        >
                          {item.name}
                          <ArrowUpRight className="w-3 h-3" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-red-500 text-sm font-bebas tracking-wider uppercase"
                >
                  Visit Site
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Work;
