import React, { useEffect, useRef } from "react";

const Info: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const metaTags = {
      description:
        "Get to know Dillan Milosevich - a creative front-end developer passionate about intuitive design, gaming, and building engaging web experiences.",
      keywords:
        "Dillan Milosevich, Front-End Developer, UI Designer, Web Developer Bio, Creative Developer",
      author: "Dillan Milosevich",
      "og:title": "About Dillan Milosevich | Creative Front-End Developer",
      "og:description":
        "Meet Dillan Milosevich - a front-end developer combining intuitive design with creative development to craft engaging web experiences.",
      "og:type": "website",
      "og:url": window.location.href,
      "twitter:card": "summary_large_image",
      "twitter:title": "About Dillan Milosevich | Creative Front-End Developer",
      "twitter:description":
        "Meet Dillan Milosevich - a front-end developer combining intuitive design with creative development to craft engaging web experiences.",
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
            const delayClass = index === 0 ? "delay-[300ms]" : "delay-[700ms]";
            p.classList.add("animate-fadeIn", delayClass);
          });
        } else {
          sectionRef.current
            ?.querySelector("h2")
            ?.classList.remove("animate-expandText");
          sectionRef.current?.querySelectorAll("p").forEach((p) => {
            p.classList.remove(
              "animate-fadeIn",
              "delay-[300ms]",
              "delay-[700ms]"
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
      {/* Title with Expand Animation (Changed from H1 to H2) */}
      <h2 className="text-[6rem] sm:text-[8rem] md:text-[10rem] lg:text-[11rem] font-bebas uppercase tracking-normal sm:tracking-wide max-w-[90%] sm:max-w-[80%] md:max-w-[70%] lg:max-w-[60%] text-white opacity-0">
        Milosevich
      </h2>

      {/* Subtext */}
      <p className="text-xl sm:text-2xl md:text-2xl text-gray-400 font-bebas mt-4 opacity-0">
        The name's long, but my load times aren't.
      </p>

      {/* Description */}
      <p className="text-slateGreen text-[1.6rem] mt-10 mb-10 sm:text-[2rem] md:text-[2.5rem] text-slateGreen font-bebas max-w-[600px] opacity-0 leading-relaxed text-slateGreen">
        I'm a engineer who treats UI like a good joke—if you have to explain it,
        it's not working. I blend clean code with creative flair, fueled by
        coffee, gaming, and the occasional existential crisis. Let's build
        something intuitive, fun, and maybe even a little cheeky and make the
        web a better place with your idea.
      </p>
    </section>
  );
};

export default Info;
