import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { trackCtaClick } from "../utils/analytics";

const highlights = [
  { label: "Web Development", icon: "◆" },
  { label: "AI & Automation", icon: "◆" },
  { label: "UI / UX", icon: "◆" },
  { label: "Small Business Software", icon: "◆" },
];

const Info: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);
  const highlightsRef = useRef<HTMLDivElement>(null);

  const nameInView = useInView(nameRef, { once: true, margin: "-50px" });
  const bioInView = useInView(bioRef, { once: true, margin: "-40px" });
  const highlightsInView = useInView(highlightsRef, { once: true, margin: "-30px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax: the big ghost text drifts up slower than scroll
  const ghostY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  // Subtle horizontal drift for the accent line
  const lineWidth = useTransform(scrollYProgress, [0.1, 0.5], ["0%", "100%"]);
  const arcPathLength = useTransform(scrollYProgress, [0.06, 0.56], [0, 1]);
  const arcOpacity = useTransform(scrollYProgress, [0, 0.12, 0.72], [0, 0.72, 0.28]);
  const arcY = useTransform(scrollYProgress, [0, 1], [-28, 38]);

  const surname = "MILOSEVICH";

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col items-center justify-start text-center pt-22 pb-16 px-6 overflow-hidden min-h-screen"
    >
      <motion.svg
        aria-hidden="true"
        viewBox="0 0 260 720"
        className="pointer-events-none absolute -left-16 top-0 hidden h-[48rem] w-[18rem] md:block lg:-left-10 lg:h-[54rem] lg:w-[21rem]"
        style={{ opacity: arcOpacity, y: arcY }}
      >
        <filter id="info-pencil-roughen">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="2"
            seed="7"
            result="noise"
          />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.8" />
        </filter>
        <motion.path
          d="M44 26 C220 130 222 586 44 694"
          fill="none"
          stroke="rgba(238,238,226,0.7)"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="3 9"
          filter="url(#info-pencil-roughen)"
          style={{ pathLength: arcPathLength }}
        />
      </motion.svg>

      {/* Ghost parallax text behind everything */}
      <motion.div
        style={{ y: ghostY }}
        className="absolute top-10 left-1/2 -translate-x-1/2 select-none pointer-events-none"
        aria-hidden="true"
      >
        <span className="text-[8rem] sm:text-[14rem] md:text-[20rem] lg:text-[26rem] font-bebas leading-none text-white/[0.02] whitespace-nowrap">
          MILO
        </span>
      </motion.div>

      {/* Animated accent line */}
      <motion.div
        style={{ width: lineWidth }}
        className="h-[1px] bg-gradient-to-r from-transparent via-red-500/60 to-transparent mb-10 mt-4"
      />

      {/* Name — letter-by-letter stagger */}
      <div ref={nameRef} className="relative w-full mb-2">
        <h2 className="sr-only">Milosevich</h2>
        <div
          className="flex justify-center items-end gap-0 sm:gap-1 flex-wrap"
          aria-hidden="true"
        >
          {surname.split("").map((letter, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 60, rotateX: -90 }}
              animate={
                nameInView
                  ? { opacity: 1, y: 0, rotateX: 0 }
                  : {}
              }
              transition={{
                duration: 0.6,
                delay: i * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="inline-block text-[3.5rem] sm:text-[6rem] md:text-[10rem] lg:text-[11rem] font-bebas uppercase tracking-normal sm:tracking-wide text-white leading-none"
              style={{ transformOrigin: "bottom center" }}
            >
              {letter}
            </motion.span>
          ))}
        </div>

        {/* Subtext — fades in after the name */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={nameInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
          className="text-xl sm:text-2xl md:text-2xl text-gray-400 font-bebas mt-4"
        >
          The name's long, but my load times aren't.
        </motion.p>
      </div>

      {/* Bio section with staggered reveal */}
      <div ref={bioRef} className="mt-10 mb-14 max-w-[640px]">
        <motion.p
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          animate={
            bioInView
              ? { opacity: 1, y: 0, filter: "blur(0px)" }
              : {}
          }
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-white text-[1.5rem] sm:text-[1.8rem] md:text-[2.2rem] font-bebas leading-relaxed"
        >
          I treat UI like a good joke — if you have to explain it, it's not
          working.
        </motion.p>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={bioInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent my-8 origin-left"
        />

        <motion.p
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          animate={
            bioInView
              ? { opacity: 1, y: 0, filter: "blur(0px)" }
              : {}
          }
          transition={{ duration: 0.9, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-white/80 text-[1.3rem] sm:text-[1.5rem] md:text-[1.8rem] font-bebas leading-relaxed"
        >
          Beyond design and code, I specialize in building custom AI
          tools, automation workflows, and small business software that spot where
          your business is bleeding time or money, then patch it up — quietly
          making you more efficient while you're busy doing your thing.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          animate={
            bioInView
              ? { opacity: 1, y: 0, filter: "blur(0px)" }
              : {}
          }
          transition={{ duration: 0.9, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="text-white text-[1.1rem] sm:text-[1.3rem] md:text-[1.5rem] font-bebas leading-relaxed mt-6"
        >
          Fueled by coffee, gaming, and the occasional existential crisis — I make sure your
          digital presence is fast, functional, and unforgettable.
        </motion.p>
      </div>

      {/* Founder studio callout */}
      <motion.a
        href="https://www.creativecurrents.co"
        target="_blank"
        rel="noopener noreferrer"
        onClick={() =>
          trackCtaClick(
            "creative_currents",
            "about_founder_callout",
            "https://www.creativecurrents.co"
          )
        }
        initial={{ opacity: 0, y: 24 }}
        animate={bioInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ y: -4 }}
        className="studio-card-pulse studio-card-brand group relative mb-12 w-full max-w-xl overflow-hidden rounded-[1.75rem] border px-6 py-5 text-left transition-colors duration-300 sm:px-8 sm:py-6"
        aria-label="Visit Creative Currents, Dillan's independent software studio"
      >
        <span
          aria-hidden="true"
          className="absolute inset-y-0 left-0 z-10 w-[3px] bg-[#d83c32] transition-all duration-300 group-hover:w-1"
        />

        <span
          aria-hidden="true"
          className="studio-card-ambient pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full bg-[#d83c32]/15 blur-3xl"
        />

        <img
          src="/brand/creative-currents-wave.png"
          alt=""
          aria-hidden="true"
          className="creative-currents-mark pointer-events-none absolute right-3 top-3 z-10 h-24 w-24 object-contain sm:right-5 sm:top-4 sm:h-28 sm:w-28"
        />

        <span className="relative z-10 mb-3 flex items-center gap-3 pr-16 text-xs font-mono font-semibold uppercase tracking-[0.22em] text-[#121210]/70 sm:pr-24 sm:text-sm">
          <span className="h-px w-7 bg-[#d83c32]" />
          Independent software studio
        </span>

        <span className="relative z-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
          <span className="pr-8 sm:pr-16">
            <span className="creative-currents-display block text-4xl uppercase leading-none text-[#121210] sm:text-5xl">
              Creative Currents
            </span>
            <span className="creative-currents-tagline mt-1 block text-xl text-[#d83c32] sm:text-2xl">
              Ideas in motion. Software with soul.
            </span>
            <span className="creative-currents-body mt-3 block max-w-md text-sm leading-relaxed text-[#4f4f48] sm:text-base">
              I founded it to create thoughtful apps and digital products that
              make everyday life flow a little better.
            </span>
          </span>

          <span className="studio-card-cta inline-flex w-fit shrink-0 items-center gap-2 rounded-full border border-[#121210] bg-[#121210] px-4 py-2 font-mono text-xs font-semibold uppercase tracking-[0.12em] text-[#efeee8] transition-all duration-300 group-hover:border-[#d83c32] group-hover:bg-[#d83c32] group-hover:text-white sm:mb-1 sm:text-sm">
            Explore the studio
            <ArrowUpRight
              aria-hidden="true"
              strokeWidth={1.8}
              className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 sm:h-5 sm:w-5"
            />
          </span>
        </span>
      </motion.a>

      {/* Highlight pills / cards */}
      <div
        ref={highlightsRef}
        className="flex flex-wrap justify-center gap-3 sm:gap-4 max-w-xl"
      >
        {highlights.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={
              highlightsInView
                ? { opacity: 1, scale: 1, y: 0 }
                : {}
            }
            transition={{
              duration: 0.5,
              delay: i * 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            whileHover={{ scale: 1.08, y: -4 }}
            className="group relative px-5 py-2.5 sm:px-6 sm:py-3 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-sm cursor-default transition-colors duration-300 hover:border-red-500/40 hover:bg-red-500/[0.06]"
          >
            <span className="text-sm sm:text-base font-bebas tracking-wider text-white/70 group-hover:text-white transition-colors duration-300">
              <span className="text-red-500/60 mr-2 text-xs group-hover:text-red-400 transition-colors duration-300">
                {item.icon}
              </span>
              {item.label}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Bottom accent line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={highlightsInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="h-[1px] w-full max-w-xs bg-gradient-to-r from-transparent via-red-500/30 to-transparent mt-14 origin-center"
      />
    </section>
  );
};

export default Info;
