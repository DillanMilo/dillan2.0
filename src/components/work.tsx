// src/components/work.tsx
import React, { useEffect, useState, useRef } from "react";
import { ChevronDown, ArrowUpRight, ExternalLink } from "lucide-react";
import { getProjectsSchema } from "../utils/schema";

interface Project {
  title: string;
  description: string;
  link: string;
  gradient: string;
  accentColor: string;
  tag: string;
  desktopVideo?: string;
  mobileVideo?: string;
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
    desktopVideo: "/videos/a5rail-desktop.webm",
    mobileVideo: "/videos/a5rail-mobile.webm",
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
    desktopVideo: "/videos/africawild-desktop.webm",
    mobileVideo: "/videos/africawild-mobile.webm",
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
    desktopVideo: "/videos/forme-desktop.webm",
    mobileVideo: "/videos/forme-mobile.webm",
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
    desktopVideo: "/videos/bios-desktop.webm",
    mobileVideo: "/videos/bios-mobile.webm",
    isDropdown: true,
    dropdownItems: [
      { name: "Carly Milo", link: "https://carly-milo.com" },
      { name: "Chad Hanekom", link: "https://chadhanekom.com" },
      { name: "Richard Nell", link: "https://richard-nell.vercel.app" },
    ],
  },
];

// Browser window chrome component
const BrowserFrame: React.FC<{
  project: Project;
  parallaxY: number;
  isMobile?: boolean;
}> = ({ project, parallaxY, isMobile }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);

  const videoSrc = isMobile ? project.mobileVideo : project.desktopVideo;

  // Auto-play video when the frame is in view, pause when not
  useEffect(() => {
    const el = frameRef.current;
    const video = videoRef.current;
    if (!el || !video || !videoSrc) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [videoSrc]);

  const showVideo = videoSrc && videoLoaded && !videoError;

  return (
    <div
      ref={frameRef}
      className="relative w-full overflow-hidden rounded-lg border border-white/[0.08] shadow-2xl shadow-black/50"
    >
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

      {/* Viewport area */}
      <div
        className="relative overflow-hidden"
        style={{ height: isMobile ? "280px" : "420px" }}
      >
        {/* Gradient fallback — always present behind the video */}
        <div
          className="absolute inset-[-30%] will-change-transform"
          style={{
            background: project.gradient,
            transform: `translate3d(0, ${parallaxY}px, 0)`,
          }}
        />

        {/* Video layer */}
        {videoSrc && !videoError && (
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            preload="metadata"
            onLoadedData={() => setVideoLoaded(true)}
            onError={() => setVideoError(true)}
            className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-700 ${
              showVideo ? "opacity-100" : "opacity-0"
            } ${isMobile ? "animate-kenBurns" : ""}`}
            style={
              isMobile
                ? undefined
                : { transform: `translate3d(0, ${parallaxY * 0.15}px, 0)` }
            }
          >
            <source src={videoSrc} type="video/webm" />
          </video>
        )}

        {/* Overlays only show when no video is loaded (gradient fallback mode) */}
        {!showVideo && (
          <>
            {/* Noise/grain overlay */}
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

            {/* Floating accent glow */}
            <div
              className="absolute w-40 h-40 rounded-full blur-3xl opacity-20"
              style={{
                background: project.accentColor,
                bottom: "10%",
                right: "10%",
                transform: `translate3d(0, ${parallaxY * -0.5}px, 0)`,
              }}
            />

            {/* Large watermark letter */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span
                className="text-[12rem] sm:text-[18rem] font-bebas leading-none select-none opacity-[0.04]"
                style={{
                  transform: `translate3d(0, ${parallaxY * -0.3}px, 0)`,
                }}
              >
                {project.title.charAt(0)}
              </span>
            </div>
          </>
        )}

        {/* Tag badge — always visible */}
        <div className="absolute bottom-4 right-4 z-10">
          <span
            className="px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-bebas rounded-full border backdrop-blur-sm"
            style={{
              color: project.accentColor,
              borderColor: `${project.accentColor}33`,
              backgroundColor: `${project.accentColor}1a`,
            }}
          >
            {project.tag}
          </span>
        </div>

        {/* Subtle vignette on video for polish */}
        {showVideo && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              boxShadow: "inset 0 0 60px rgba(0,0,0,0.4)",
            }}
          />
        )}
      </div>
    </div>
  );
};

// ——————————————————————————————————————
// DESKTOP: Single project card with parallax
// ——————————————————————————————————————
const DesktopProjectCard: React.FC<{
  project: Project;
  index: number;
  openDropdown: number | null;
  toggleDropdown: (index: number) => void;
  isEven: boolean;
}> = ({ project, index, openDropdown, toggleDropdown, isEven }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [parallaxY, setParallaxY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Parallax on scroll — shift the browser frame background
  useEffect(() => {
    const handleScroll = () => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const viewH = window.innerHeight;
      // How far through the viewport the card is (0 = just entering bottom, 1 = leaving top)
      const progress = 1 - (rect.top + rect.height) / (viewH + rect.height);
      // Map to a parallax range of -40 to +40
      setParallaxY((progress - 0.5) * 80);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Reveal on scroll
  useEffect(() => {
    if (!cardRef.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.15 }
    );
    obs.observe(cardRef.current);
    return () => obs.disconnect();
  }, []);

  // Staggered reveal styles — browser frame slides from its side, text cascades in
  const frameDirection = isEven ? -60 : 60; // px offset direction
  const textDirection = isEven ? 40 : -40;

  const frameStyle: React.CSSProperties = {
    transform: isVisible
      ? "translate3d(0, 0, 0) scale(1)"
      : `translate3d(${frameDirection}px, 30px, 0) scale(0.95)`,
    opacity: isVisible ? 1 : 0,
    filter: isVisible ? "blur(0px)" : "blur(8px)",
    transition: "transform 0.9s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1), filter 0.9s cubic-bezier(0.16, 1, 0.3, 1)",
  };

  const textItemStyle = (delay: number): React.CSSProperties => ({
    transform: isVisible
      ? "translate3d(0, 0, 0)"
      : `translate3d(${textDirection}px, 20px, 0)`,
    opacity: isVisible ? 1 : 0,
    filter: isVisible ? "blur(0px)" : "blur(4px)",
    transition: `transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, filter 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
  });

  return (
    <div ref={cardRef}>
      <div
        className={`flex items-center gap-12 lg:gap-20 ${
          isEven ? "flex-row" : "flex-row-reverse"
        }`}
      >
        {/* Browser frame side — slides in from its edge with scale + blur */}
        <div className="flex-[1.4] min-w-0" style={frameStyle}>
          <BrowserFrame project={project} parallaxY={parallaxY} />
        </div>

        {/* Info side — each element staggers in */}
        <div className="flex-1 flex flex-col justify-center">
          {/* Project number */}
          <span
            className="text-[5rem] lg:text-[6rem] font-bebas leading-none text-white/[0.04] mb-2 select-none"
            style={textItemStyle(150)}
          >
            {String(index + 1).padStart(2, "0")}
          </span>

          <span
            className="inline-block w-10 h-[1px] mb-5"
            style={{ ...textItemStyle(250), background: project.accentColor }}
          />

          <h3
            className="text-5xl lg:text-6xl xl:text-7xl font-bebas text-white leading-[0.9] mb-5"
            style={textItemStyle(350)}
          >
            {project.title}
          </h3>

          <p
            className="text-base lg:text-lg text-white/50 leading-relaxed font-sans max-w-md"
            style={textItemStyle(450)}
          >
            {project.description}
          </p>

          {/* CTA / Dropdown */}
          <div style={textItemStyle(550)}>
            {project.isDropdown && project.dropdownItems ? (
              <div className="mt-8">
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
                className="group mt-8 inline-flex items-center gap-3 text-red-500 hover:text-red-400 transition-colors duration-300"
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
    </div>
  );
};

// ——————————————————————————————————————
// MAIN WORK COMPONENT
// ——————————————————————————————————————
const Work: React.FC = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(getProjectsSchema());
    document.head.appendChild(script);
    return () => {
      if (script.parentNode) script.parentNode.removeChild(script);
    };
  }, []);

  const containerRef = useRef<HTMLDivElement>(null!) as React.RefObject<HTMLDivElement>;
  const [isMobile, setIsMobile] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [sectionVisible, setSectionVisible] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry) setSectionVisible(entry.isIntersecting); },
      { threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const toggleDropdown = (index: number) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

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

  // DESKTOP LAYOUT — Full-width cinematic stacked cards with parallax
  return (
    <section
      ref={containerRef}
      className="relative py-24 lg:py-32"
    >
      <h2 className="sr-only">Portfolio & Projects</h2>

      {/* Section header */}
      <div
        className={`text-center mb-20 lg:mb-28 transition-all duration-700 ${
          sectionVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-6"
        }`}
      >
        <p className="text-sm text-white/30 font-bebas tracking-[0.3em] uppercase mb-3">
          Selected Work
        </p>
        <div className="w-10 h-[1px] bg-red-600 mx-auto" />
      </div>

      {/* Project cards */}
      <div className="flex flex-col gap-28 lg:gap-40 px-8 lg:px-16 xl:px-24 max-w-[1500px] mx-auto">
        {projects.map((project, index) => (
          <DesktopProjectCard
            key={index}
            project={project}
            index={index}
            openDropdown={openDropdown}
            toggleDropdown={toggleDropdown}
            isEven={index % 2 === 0}
          />
        ))}
      </div>
    </section>
  );
};

// ——————————————————————————————————————
// MOBILE LAYOUT (unchanged)
// ——————————————————————————————————————
const MobileWork: React.FC<{
  sectionVisible: boolean;
  containerRef: React.RefObject<HTMLDivElement>;
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
            <BrowserFrame project={project} parallaxY={0} isMobile />

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
