import React, { useEffect, useRef } from "react";

const Info: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const metaTags = {
      description:
        "Get to know Dillan Milosevich - a creative software developer passionate about front-end development, intuitive design, gaming, and building engaging web experiences.",
      keywords:
        "Dillan Milosevich, Software Developer, Front-End Developer, UI Designer, Web Developer Bio, Creative Developer",
      author: "Dillan Milosevich",
      "og:title": "About Dillan Milosevich | Creative Software Developer",
      "og:description":
        "Meet Dillan Milosevich - a software developer combining intuitive design with creative development to craft engaging web experiences.",
      "og:type": "website",
      "og:url": window.location.href,
      "twitter:card": "summary_large_image",
      "twitter:title": "About Dillan Milosevich | Creative Software Developer",
      "twitter:description":
        "Meet Dillan Milosevich - a software developer combining intuitive design with creative development to craft engaging web experiences.",
      robots: "index, follow",
      canonical: window.location.href,
    };

    document.title = "About | Dillan Milosevich";

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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          // Query for h2 (since we're using an H2 for the title)
          sectionRef.current
            ?.querySelector("h2")
            ?.classList.add("animate-expandText");
          sectionRef.current?.querySelectorAll("p").forEach((p, index) => {
            const delayClass = index === 0 ? "delay-[400ms]" : "delay-[600ms]";
            p.classList.add("animate-fadeIn", delayClass);
          });
        } else {
          sectionRef.current
            ?.querySelector("h2")
            ?.classList.remove("animate-expandText");
          sectionRef.current?.querySelectorAll("p").forEach((p) => {
            p.classList.remove(
              "animate-fadeIn",
              "delay-[400ms]",
              "delay-[600ms]"
            );
          });
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section
      id="info"
      ref={sectionRef}
      className="relative flex flex-col items-center justify-start text-center pt-22 pb-16 px-6 overflow-hidden"
    >
      {/* Title with Expand Animation */}
      <h2 className="text-[3.5rem] sm:text-[6rem] md:text-[10rem] lg:text-[11rem] font-bebas uppercase tracking-normal sm:tracking-wide text-white opacity-0 w-full">
        MILOSEVICH
      </h2>

      {/* Subtext */}
      <p className="text-xl sm:text-2xl md:text-2xl text-gray-400 font-bebas mt-4 opacity-0">
        The name's long, but my load times aren't.
      </p>

      {/* Description */}
      <p className="text-white text-[1.6rem] mt-10 mb-10 sm:text-[2rem] md:text-[2.5rem] font-bebas max-w-[600px] opacity-0 leading-relaxed">
        I treat UI like a good joke — if you have to explain it, it's not
        working. Beyond design and code, I specialize in building custom AI
        tools, automation workflows, and small business software that spot where
        your business is bleeding time or money, then patch it up — quietly
        making you more efficient while you're busy doing your thing. Fueled by
        coffee, gaming, and the occasional existential crisis, I make sure your
        digital presence is fast, functional, and unforgettable.
      </p>
    </section>
  );
};

export default Info;
